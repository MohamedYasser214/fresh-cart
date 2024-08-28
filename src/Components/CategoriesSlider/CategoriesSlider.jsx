import React, { useState, useEffect } from 'react';
import Slider from "react-slick";
import axios from 'axios'; 

export default function CategoriesSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000, 
  };

  const [Categories, setCategories] = useState([]);

  async function getRecentCategories() {
    try {
      let { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      console.log(data.data); 
      setCategories(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getRecentCategories(); 
  }, []);

  return (
    <div className=' w-11/12 m-auto'>
        <Slider {...settings }>
      {Categories?.map((category, index) => (
        <div key={index} className=''>
          <img src={category.image} className='w-full h-[200px]' alt={category.name} />
          <h3>{category.name}</h3>
        </div>
      ))}
    </Slider>
    </div>
  );
}
