import React, { useEffect, useState } from 'react';
import Style from './Categories.module.css';
import axios from 'axios';
import Loading from '../Loading/Loading';

export default function Categories() {
  const [isLoadingScreen, setIsLoadingScreen] = useState(false);
  const [categories, setCategories] = useState([]);

  async function getCategories() {
    try {
      setIsLoadingScreen(true);
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/categories');
      setCategories(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoadingScreen(false);
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  if (isLoadingScreen) {
    return (
      <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
        <Loading />
      </div>
    );
  }

  return (
    <div className='py-32'>
      <div className='container max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-7'>
        {categories.map((cat) => (
          <div
            key={cat._id}
            className={`${Style.category} rounded-lg border border-gray-200 cursor-pointer hover:shadow-lg hover:border-green-600 transition duration-300`}
          >
            <div className='bg-cover'>
              <img
                src={cat.image}
                className='h-72 w-full object-cover rounded-t-md'
                alt={cat.name}
              />
            </div>
            <div className='py-3'>
              <h3 className='text-green-600 dark:text-green-500 font-semibold text-center'>
                {cat.name}
              </h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}