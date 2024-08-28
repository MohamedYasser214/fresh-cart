import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { CounterContext } from '../../Context/CounterContext'
import { UserContext } from '../Context/UserContext'

export default function Navbar() {
  

  let navigate = useNavigate();
  let {userData , setUserData} =  useContext(UserContext)


    function logOut(){
      localStorage.removeItem('userToken')
      setUserData(null);
      navigate('/login')
    }

    const toggleMenu = () => {
      setIsMenuOpen(!isMenuOpen);
    };



  return (<>
  <div>
    <nav className= ' py-5  bg-gray-200 capitalize md:fixed z-50 text-slate-500 text-center  top-0 inset-x-0'>
      <div className='container items-center flex-col  md:flex-row flex justify-between  w-11/12 m-auto'>
        <div className='flex items-center space-x-3 flex-col md:flex-row '>
        <div className='flex justify-center items-center '>
        <i _ngcontent-pix-c20="" class="fa-solid fa-cart-shopping nav-icon font-bold text-green-500 text-2xl"></i>
        <h5 className='text-black text-xl '>Fresh Cart</h5>
        </div>
        {userData?      <ul className='flex space-x-2 flex-col md:flex-row'>
        <li><NavLink to="home"> Home</NavLink></li>
        <li><NavLink to="cart">Cart</NavLink></li>
        <li><NavLink to="wishlist">WishList</NavLink></li>
        <li><NavLink to="products">product</NavLink></li>
        <li><NavLink to="categories">categories</NavLink></li>
        <li><NavLink to="brands">brands</NavLink></li>
      </ul> : ''}
        </div>
        <div className=''>
      <ul className='flex space-x-2 text-black items-center flex-col md:flex-row'>
        {userData ? <li><span onClick={()=>logOut()} className='cursor-pointer text-gray-500'>Logout</span></li> :<>
        
        <li><NavLink to="login">Login</NavLink></li>
        <li><NavLink to="register">Register</NavLink></li>
        </>}
        
      </ul>
        </div>
      </div>
    </nav>
  </div>
  
  </>)
}
