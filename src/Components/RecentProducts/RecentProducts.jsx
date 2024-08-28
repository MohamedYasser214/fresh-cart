import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { CartContext } from '../Context/CartContext';

const fetchProducts = async () => {
  const response = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
  return response.data;
};

export default function RecentProducts({ product }) {
  const { addProductToCart, addToWishList } = useContext(CartContext);

  const { data: products, isLoading, error } = useQuery({
    queryKey: ['recentProducts'],
    queryFn: fetchProducts,
    staleTime: 3000 
  });


  return (
    <div className="max-w-7xl mx-auto p-4 relative">
      <div className="group relative border p-4 bg-white rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-green-500">
      <div className="text-black mt-1 absolute right-0 cursur-pointer">
                <i onClick={() => addToWishList(product.id)} className="fas fa-heart"></i>
              </div>
        <Link to={`/productdetails/${product.id}`}>
          <img
            src={product.imageCover}
            className="w-full h-48 object-cover rounded-lg mb-2"
            alt={product.title}
          />
          <h2 className="text-main text-sm">{product.category.name}</h2>
          <h2 className="font-medium">{product.title.split(' ').slice(0, 2).join(' ')}</h2>
          <div className="flex justify-between my-2 items-center">
            <h3 className="font-semibold">{product.price} EGP</h3>
            <div className="flex flex-col items-center">
              <div className="flex items-center text-green-500">
                <i className="fas fa-star mr-1"></i>
                {product.ratingsAverage}
              </div>

            </div>
          </div>
        </Link>
        <button
          onClick={() => addProductToCart(product.id)}
          className="absolute inset-x-4 bottom-1 mx-auto bg-green-500 text-white rounded py-1 px-4 text-sm transform translate-y-4 opacity-0 transition-transform transition-opacity duration-300 ease-in-out group-hover:opacity-100 group-hover:translate-y-0"
        >
          + Add
        </button>
      </div>
    </div>
  );
}
