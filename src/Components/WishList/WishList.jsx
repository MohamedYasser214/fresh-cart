import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
import Loading from "../Loading/Loading";

export default function Wishlist() {
    const { addToWishList, getWishListItems, loading, setWishlist, wishlist } = useContext(CartContext);
    const [localWishlist, setLocalWishlist] = useState([]);

    const fetchWishList = async () => {
       try {
        const {data}  = await getWishListItems();
        
        setWishlist(data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
    useEffect(() => {
        fetchWishList()
      }, []);
    

    return (
        <>
            <div className="flex justify-center items-center mt-32">
            {loading ? 
                <Loading />
             : 
                <div>
                    {wishlist?.length > 0 ? (
                        <table>
                            <tbody>
                                {wishlist?.map((product, index) => (
                                    <tr key={index}>
                                        <td className="p-4">
                                            <img
                                                src={product.imageCover}
                                                className="w-16 md:w-32 max-w-full max-h-full"
                                                alt={product.title}
                                            />
                                        </td>
                                        <td>
                                            <Link to={`/productdetails/${product.id}`}>
                                                {product.title}
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4">
                                            <i
                                                className={`fas fa-heart cursor-pointer ${wishlist.some((item) => item.id === product.id) ? 'text-red-500' : 'text-gray-400'}`}
                                                onClick={() => handleWishlistClick(product.id)}
                                            ></i>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p></p>
                    )}
                </div>
            }
            </div>
        </>
    );
}
