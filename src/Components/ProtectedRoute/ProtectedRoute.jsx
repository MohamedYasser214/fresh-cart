import React, { useState } from 'react'
import style from './ProtectedRoute.module.css'
import { Navigate, useNavigate} from 'react-router-dom'

export default function ProtectedRoute({children}) {
/*   console.log(localStorage.getItem("usertoken"));
 */  

    if(localStorage.getItem('userToken')  !== null) {
      return children

    }else{
        return <Navigate to='/login'/>
    }


}