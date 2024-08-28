import  { useEffect, useState } from 'react';
import RecentProducts from '../RecentProducts/RecentProducts.jsx';
import axios from 'axios';
import Loading from '../Loading/Loading.jsx';
import CategoriesSlider from '../CategoriesSlider/CategoriesSlider.jsx';
import MainSlider from '../MainSlider/MainSlider.jsx';

export default function Home() {
  const [products, setProducts] = useState([]);

  async function getRecentProducts() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      setProducts(data.data);
      console.log(data.data); 
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRecentProducts();
  }, []);

  return (
    <>

      <MainSlider/>  

      <CategoriesSlider/>

      
      {products.length ? (
        <div className='flex flex-wrap justify-center '>
          {products.map((product, index) => (
            <RecentProducts key={index} product={product} />
          ))}
        </div>
      ) : (
        <div className=" flex justify-center py-16 ">
          <Loading/>
        </div>
      )}
    </>
  );
}
