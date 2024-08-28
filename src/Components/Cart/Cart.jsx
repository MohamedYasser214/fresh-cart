import React, { useContext, useEffect, useState } from 'react'
import style from './Cart.module.css'
import { CartContext } from '../Context/CartContext'
import Loading from '../Loading/Loading'
import { Link } from 'react-router-dom'


export default function Cart() {

let {getCart , cart, updateProductCount , loading , deleteProduct} = useContext(CartContext)

   useEffect (()=>{

     getCart();

   } ,[])
  return <>
      <div className='flex justify-center items-center my-20 w-full '>
          
   {loading ? <Loading/> : <div className='flex justify-center items-center w-full'>
      {cart? <div className="relative overflow-x-auto w-3/4 mx-auto shadow-md sm:rounded-lg ">
  <table className=" m-auto text-sm text-left mb-2 rtl:text-right text-gray-500 dark:text-gray-400 w-full">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 w-full">
      <tr>
        <th scope="col" className="px-16 py-3">
          <span className="sr-only">Image</span>
        </th>
        <th scope="col" className="px-6 py-3">
          Product
        </th>
        <th scope="col" className="px-6 py-3">
          Qty
        </th>
        <th scope="col" className="px-6 py-3">
          Price
        </th>
        <th scope="col" className="px-6 py-3">
          Action
        </th>
      </tr>
    </thead>
    <tbody>
        {cart?.data.products.map((product)=> <tr key={product.product.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
        <td className="p-4">
          <img src={product.product.imageCover} className="w-16 md:w-32 max-w-full max-h-full" alt="Apple Watch" />
        </td>
        <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
          {product.product.title}
        </td>
        <td className="px-6 py-4">
          <div className="flex items-center">
            <button onClick={()=> updateProductCount(product.product.id , product.count-1)} className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 1h16" />
              </svg>
            </button>
            <div>
              <span>{product.count}</span>
            </div>
            <button onClick={()=> updateProductCount(product.product.id , product.count+1)} className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" type="button">
              <span className="sr-only">Quantity button</span>
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>
        </td>
        <td className="px-3 py-4 font-semibold text-gray-900 dark:text-white">
          {product.price}  EGP
        </td>
        <td className="px-6 py-4">
          <button onClick={()=> deleteProduct(product.product.id)} className="font-medium text-red-600 dark:text-red-500 hover:underline">Remove</button>
        </td>
      </tr> )}
    </tbody>
    <tfoot>
      <tr className='text-xl text-black my-2 font-semibold'>
      <td colSpan={3} className='p-5'>total cart price</td>
      <td>{cart.data.totalCartPrice}</td>
      </tr>
    </tfoot>
  </table>

          <div className='p-5'> <Link to={'/checkout'} className='bg-green-500 text-center text-white p-2   rounded-md '>Check Out</Link></div>

</div> : <h2 className='text-2xl text-black font-semibold text-center'>Cart Is Empty</h2>} 


   </div> }
      </div>
 
  </>
}
