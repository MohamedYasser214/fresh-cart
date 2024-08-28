import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { CartContext } from '../Context/CartContext';
import Loading from '../Loading/Loading';


export default function RecentProducts() {
  const { addProductToCart } = useContext(CartContext);

  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  async function getProduct() {
    try {
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return <>
        <div className='flex justify-center items-center mt-32'>
        {loading ? 
                <Loading />
             : <div className="max-w-7xl mx-auto p-4">
             <div className="mb-8">
               <input
                 type="text"
                 placeholder="Search products..."
                 className="w-full p-4 border rounded-md text-lg"
                 value={searchTerm}
                 onChange={(e) => setSearchTerm(e.target.value)}
               />
             </div>
       
             {loading ? (
               <div className="text-center text-lg">Loading...</div>
             ) : (
               <div className="flex flex-wrap -mx-4">
                 {filteredProducts.length > 0 ? (
                   filteredProducts.map((product) => (
                     <div key={product.id} className="relative w-full sm:w-1/2 lg:w-1/4 px-4 py-4">
                       <div className="border p-4 bg-white rounded-lg transition-shadow duration-300 ease-in-out hover:shadow-lg hover:shadow-green-500">
                         <Link to={`/productdetails/${product.id}`}>
                           <img
                             src={product.imageCover}
                             className="w-full h-48 object-cover rounded-lg mb-2"
                             alt={product.title}
                           />
                           <h2 className="text-main text-sm">{product.category.name}</h2>
                           <h2 className="font-medium mt-1">
                             {product.title.length > 20 ? `${product.title.slice(0, 20)}...` : product.title}
                           </h2>
                           <div className="flex justify-between my-2 items-center">
                             <h3 className="font-semibold">{product.price} EGP</h3>
                             <div className="flex flex-col items-center">
                               <div className="flex items-center text-green-500">
                                 <i className="fas fa-star mr-1"></i>
                                 {product.ratingsAverage}
                               </div>
                               <div className="text-black mt-1">
                                 <i className="fas fa-heart"></i>
                               </div>
                             </div>
                           </div>
                         </Link>
                         <button
                           onClick={() => addProductToCart(product.id)}
                           className="w-full bg-green-500 text-white rounded py-2 px-4 hover:bg-green-600"
                         >
                           + Add
                         </button>
                       </div>
                     </div>
                   ))
                 ) : (
                   <div className="text-center text-lg">No products found.</div>
                 )}
               </div>
             )}
           </div>}
        </div>
  </>
   
}
