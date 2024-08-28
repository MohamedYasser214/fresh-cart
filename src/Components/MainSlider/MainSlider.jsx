import React from 'react'
import slide1 from '../../assets/images/slider-image-1.jpeg'
import slide2 from '../../assets/images/slider-image-2.jpeg'
import slide3 from '../../assets/images/slider-image-3.jpeg'
import Slider from 'react-slick'

export default function MainSlider() {

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000
  };

  return (
    <div className="flex flex-col lg:flex-row my-20  w-11/12 m-auto">
      <div className='lg:w-3/4 w-full'>
        <Slider {...settings}>
          <img src={slide1} className='w-full h-[400px]' alt="Slide 1" />
          <img src={slide2} className='w-full h-[400px]' alt="Slide 2" />
          <img src={slide3} className='w-full h-[400px]' alt="Slide 3" />
        </Slider>
      </div>
      <div className='lg:w-3/4 w-full mt-4 lg:mt-0'>
        <img src={slide1} className='w-full h-[200px]' alt="Slide 1 small" />
        <img src={slide2} className='w-full h-[200px]' alt="Slide 2 small" />
      </div>
    </div>
  )
}
