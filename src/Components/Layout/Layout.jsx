import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import style from './Layout.module.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import Register from '../Register/Register'
import { UserContext } from '../Context/UserContext'

export default function Layout() {

/* 
let {setUserData} = useContext(UserContext)
let navigate = useNavigate() */

  let {setUserData} = useContext(UserContext)
  let navigate = useNavigate()

  useEffect(()=>{
        
    if(localStorage.getItem('userToken')){
        setUserData(localStorage.getItem('userToken'))
    }else{    
        navigate('/')
    }
    
},[])





  return <>
    <Navbar />
    <div className="container py-14">

      <Outlet></Outlet>

    </div>

    <Footer />
  </>
}
