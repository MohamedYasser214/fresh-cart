import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Slider from "react-slick";

export default function ProductDetails() {
  let { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [error, setError] = useState(null);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true,
    autoplaySpeed:1000
  };

  async function getProductDetails(id) {
    try {
      let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
      setProductDetails(data.data);
    } catch (err) {
      setError('Failed to load product details.');
    }
  }

  useEffect(() => {
    if (id) {
      getProductDetails(id);
    }
  }, [id]);

  if (error) {
    return <p>{error}</p>;
  }

  if (!productDetails) {
    return null;
  }

  return (
    <>
      <h1 className="text-5xl text-center">Product Details</h1>
      <div className='flex items-center py-10'>
        <div className=' w-1/4 p-4'>
          <Slider {...settings}>
            {productDetails.images?.map((image, index) => (
              <img key={index} src={image} className='w-full' alt='' />
            ))}
          </Slider>
        </div>
        <div className="w-3/4">
          <h2>{productDetails.title}</h2>
          <p className='my-6 text-gray-500'>{productDetails.description}</p>
          <h3>{productDetails.category?.name}</h3>
          <div className="flex justify-between my-2">
            <h3>{productDetails.price} EGP</h3>
               <h3>
              <i className='fas fa-star text-yellow-500'></i> {productDetails.ratingAverage}
            </h3>
          </div> 
          <div className="flex justify-between items-center mt-3">
            <button className="w-full bg-green-500 text-white rounded py-2 px-4 hover:bg-green-600">
              + Add
            </button>
            <i className="fas fa-heart text-black ml-4"></i>
          </div>
        </div>
      </div>
    </>
  );
}
