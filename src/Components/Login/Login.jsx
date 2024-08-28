import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../Context/UserContext';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Login() {
  let { setUserData } = useContext(UserContext);
  const [apiError, setApiError] = useState(null);
  const [loading, setLoading] = useState(false);
  let navigate = useNavigate();

  async function handleLogin(values) {
    try {
      setLoading(true);
      let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values);

      localStorage.setItem('userToken', data.token);
      setUserData(data.token);
      navigate('/home'); // استخدم المسار المطلق
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setApiError('Incorrect email or password. Please try again.');
      } else {
        setApiError('An error occurred. Please try again later.');
      }
      setLoading(false);
    }
  }

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Email is invalid').required('Email is required'),
    password: Yup.string().matches(/^[A-Z\w{5,10}$]/, 'Password is invalid').required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  return (
    <div className="pt-8 mx-auto w-1/2 mt-10">
      <h2 className="text-3xl py-6 font-semibold text-emerald-600">Login Now</h2>
      <form onSubmit={formik.handleSubmit} className="max-w-sm mx-auto">
        {apiError && (
          <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
            {apiError}
          </div>
        )}

        <div className="mb-5 w-full group z-0 relative">
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-emerald-500">
            Your Email
          </label>
          <input
            type="email"
            value={formik.values.email}
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Email"
          />
          {formik.errors.email && formik.touched.email && (
            <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.email}
            </div>
          )}
        </div>

        <div className="mb-5 w-full group z-0 relative">
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-emerald-500">
            Your Password
          </label>
          <input
            type="password"
            value={formik.values.password}
            id="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter your Password"
          />
          {formik.errors.password && formik.touched.password && (
            <div className="px-4 py-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              {formik.errors.password}
            </div>
          )}
        </div>

        {loading ? (
          <button
            type="button"
            className="text-white bg-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-700 font-medium rounded-lg w-full sm:w-auto px-3 py-1.5 text-center dark:bg-emerald-500 dark:hover:bg-emerald-500 dark:focus:ring-emerald-700"
          >
            <i className="fas fa-spinner fa-spin-pulse"></i>
          </button>
        ) : (
          <button
            type="submit"
            className="text-white bg-emerald-500 hover:bg-emerald-500 focus:ring-4 focus:outline-none focus:ring-emerald-700 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-emerald-500 dark:hover:bg-emerald-500 dark:focus:ring-emerald-700"
          >
            Submit
          </button>
        )}
      </form>
    </div>
  );
}