import  { useContext, useEffect, } from 'react'
import { CartContext } from '../Context/CartContext'

export default function Allorders() {


let {clearCart} = useContext(CartContext);

useEffect(()=>{
  clearCart()
} , [])
    
  return <>
    
    <h1 className="text-3xl">Allorders</h1>
  
  </>
}
