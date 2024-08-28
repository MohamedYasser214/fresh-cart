import { createContext, useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
    let headers = {
        token: localStorage.getItem('userToken')
    };
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [wishlist, setWishlist] = useState([]); 

    async function checkout(shippingAddress) {
        try {
            setLoading(true);
            let response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cart?.data._id}?url=http://localhost:5173`,
                { shippingAddress },
                { headers }
            );
            window.location.href = response.data.session.url;
        } catch (err) {
            console.log(err);
            toast.error("Failed to checkout.");
        } finally {
            setLoading(false);
        }
    }

    async function addProductToCart(productId) {
        if (loading) return;
        try {
            setLoading(true);
            let response = await axios.post(
                `https://ecommerce.routemisr.com/api/v1/cart`,
                { productId },
                { headers }
            );
            toast.success(response.data.message, { duration: 1000 });
            setCart(response.data);
        } catch (err) {
            console.log(err);
            toast.error("Failed to add product to cart.");
        } finally {
            setLoading(false);
        }
    }

    async function clearCart() {
        if (loading) return;
        try {
            setLoading(true);
            await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers });
            setCart(null);
        } catch (err) {
            console.log(err);
            toast.error("Failed to clear cart.");
        } finally {
            setLoading(false);
        }
    }

    async function deleteProduct(productId) {
        if (loading) return;
        try {
            setLoading(true);
            let response = await axios.delete(
                `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                { headers }
            );
            setCart(response.data);
        } catch (err) {
            console.log(err);
            toast.error("Failed to delete product.");
        } finally {
            setLoading(false);
        }
    }

    async function updateProductCount(productId, count) {
        if (count > 0) {
            if (loading) return;
            try {
                setLoading(true);
                let response = await axios.put(
                    `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
                    { count },
                    { headers }
                );
                setCart(response.data);
            } catch (err) {
                console.log(err);
                toast.error("Failed to update product count.");
            } finally {
                setLoading(false);
            }
        } else {
            deleteProduct(productId);
        }
    }

    async function getCart() {
        if (loading) return;
        try {
            setLoading(true);
            let response = await axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers });
            setCart(response.data);
        } catch (err) {
            console.log(err);
            toast.error("Failed to fetch cart.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getCart();
        getWishListItems();
    }, []);

    async function getWishListItems() {
        try {
            if (localStorage.getItem('userToken')) {
              let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
            { headers });

            setWishlist(data?.data);  
            return data;
            }
        } catch (error) {
          console.error("Error fetching cart items:", error);
        }
      }
      


    async function addToWishList(productId) {
        try {
          let { data } = await axios.post(
            `https://ecommerce.routemisr.com/api/v1/wishlist`,
          { productId },
          { headers },
          );
          setWishlist(data?.data);
          toast.success("Item added to wishlist")
          getWishListItems() 
        } catch (error) {
          console.error(error);
        }
      }



                                        // WISHLIST


      async function addToWishlist(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: productId },
             { headers: headers })
          .then((response) => {
            setWishlist((userWishlist) => [...userWishlist, response?.data]);
            return  response ;
            })
          .catch((error) => error);
      }
    
      async function getWishlistItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers: headers })
          .then((response) =>{
            setWishlist(response?.data?.data);
              return response;
            }
        )
          .catch((error) => error);
      }
    
      async function removeWishlistItem(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, { headers: headers })
          .then((response) => {
            setWishlist((userWishlist) => userWishlist.filter(item => item.id !== productId));
          return  response ;
          })
          .catch((error) => error);
      }




    return (
        <CartContext.Provider value={{ getWishListItems
        , addToWishList,
        setWishlist,
        wishlist,
        clearCart,
          checkout,
           deleteProduct,
           loading, updateProductCount,
            addProductToCart, getCart, cart, setCart }}>
            {children}
        </CartContext.Provider>
    );
}

CartContextProvider.propTypes = {
    children: PropTypes.node.isRequired,
};


