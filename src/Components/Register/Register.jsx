import React, { useContext } from 'react'
import { useState } from 'react'
import style from './Register.module.css'
import { Formik, useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import UserContextProvider, { UserContext } from '../Context/UserContext'


export default function Register() {

  const [apiError, setApiError] = useState(null)
  const [loading, setLoading] = useState(false)
   let {setUserData}=   useContext(UserContext)

  let navigate= useNavigate()
 

  async function handleRegister(values) {
    setLoading(true)
    try {
      

      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      
      setLoading(false)
      localStorage.setItem('userToken', data.token)
      console.log(data)
      setUserData(data.token) //llcontext law mosh null htb2 el navigate
      navigate('/login');
    } catch (error) {
      setLoading(false)

      if (error.response && error.response.status === 409) {
        console.error(error.response.data.message);
        setApiError(error.response.data.message);

      } else {
        console.error('An error occurred:', error.message)
      }
    }
  }

    let validationSchema = Yup.object().shape({
      name:Yup.string().min(3,'min length is 3').max(10 , 'Max 10').required('Name is required'),
      email:Yup.string().email('email invalid').required('email is required'),
      password:Yup.string().matches(/^[A-Z\w{5,10}$]/ ,  'password invalid ex (Mohamed123)').required('password is required'),
      rePassword:Yup.string().oneOf([Yup.ref('password')] , "password and rePassword don't match").required('password is required'),
      phone:Yup.string().matches(/^(002)?01[0125][0-9]{8}/ ,  'Phone invalid ex (+20*****)').required('Phone is required')
    })
    let formik = useFormik({
      initialValues: {
        name:'',
        email:'',
        password:'',
        rePassword:'',
        phone:''
      },validationSchema:validationSchema
      ,onSubmit:handleRegister
    })
    

    return <>

<div className='mb-5 w-full group z-0 relative'></div>

    <div className='pt-8 mx-auto w-1/2'>
      <h2 className='text-3xl py-6 font-semibold text-emerald-600'>Register Now</h2>
      <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
      
      {apiError ? <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {apiError}
    </div> : ''}


    <div className="mb-5 w-full group z-0 relative">
      <label htmlFor="name"  className="block mb-2 text-sm font-medium text-emerald-500">Your name</label>
      <input type="text" value={formik.values.name} id="name" onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Name:"/>
    </div>

      {formik.errors.name && formik.touched.name ?    <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.name}
    </div> : ''}


      <div className='mb-5 w-full group z-0 relative'>  
        <label htmlFor="email"  className="block mb-2 text-sm font-medium text-emerald-500">Your Email</label>
        <input type="email" value={formik.values.email} id="email" onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Email:"/>
      </div>
      {formik.errors.email && formik.touched.email ?     <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.email}
    </div> : ''}


      <div className='mb-5 w-full group z-0 relative'>
      <label htmlFor="password"  className="block mb-2 text-sm font-medium text-emerald-500">Your Psswrod</label>
      <input type="password" value={formik.values.password} id="password" onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Password:"/>
      </div>
      {formik.errors.password && formik.touched.password ?     <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.password}
    </div> : ''}

      <div className='mb-5 w-full group z-0 relative'>
      <label htmlFor="rePassword"  className="block mb-2 text-sm font-medium text-emerald-500">Your rePassword</label>
      <input type="password" value={formik.values.rePassword} id="rePassword" onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your rePassword:"/>
      </div>
      {formik.errors.rePassword && formik.touched.rePassword ?     <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.rePassword}
    </div> : ''}

      <div className='mb-5 w-full group z-0 relative'>
      <label htmlFor="phone"  className="block mb-2 text-sm font-medium text-emerald-500">Your Phone</label>
      <input type="phone" value={formik.values.phone} id="phone" onChange={formik.handleChange} onBlur={formik.handleBlur} className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5    dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Enter your Phone:"/>
      </div>
      {formik.errors.phone && formik.touched.phone ?     <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
      {formik.errors.phone}
    </div> : ''}




          {loading ?           <button type="button" className="text-white bg-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-bg-emrbg-emerald-700 font-medium rounded-lg  w-full sm:w-auto px-3 py-1.5 text-center dark:bg-emerald-500 dark:hover:bg-emerald-5 00 dark:focus:ring-emrbg-emerald-700">
            <i className='fas fa-spinner fa-spin-pulse'></i>
          </button> : <button type="submit" className="text-white bg-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-bg-emrbg-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-500 dark:hover:bg-emerald-5 00 dark:focus:ring-emrbg-emerald-700">Submit</button>
        }

      </form>
    </div>
      

</>

  }





    // function validateForm(values){
    //   let errors = {};

    //   if (values.name ===""){
    //     errors.name = 'Name is required'
    //   }else if(!/^[A-Z][a-z]{2,10}$/.test(values.name)){
    //       errors.name = 'Name must start with capital letter ex (Mohamed)'
    //   }

    //   if (!values.phone){
    //     errors.phone = 'Phone is required'
    //   }
    //   else if(!/^(002)?01[0125][0-9]{8}/.test(values.phone)){
    //     errors.phone = 'phone must be egyptian number'
    //   }

    //   return errors
    // }