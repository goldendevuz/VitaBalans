import React, { createContext, useState, useEffect } from 'react'

export const CartContext = createContext()

export function CartProvider({ children }){
  const [items, setItems] = useState([])

  useEffect(()=>{
    const raw = localStorage.getItem('vb_cart')
    if(raw) setItems(JSON.parse(raw))
  },[])

  useEffect(()=>{
    localStorage.setItem('vb_cart', JSON.stringify(items))
  },[items])

  const add = (product)=>{
    setItems(prev=>{
      const found = prev.find(p=>p.id===product.id)
      if(found) return prev.map(p=>p.id===product.id?{...p, qty:p.qty+1}:p)
      return [...prev, {...product, qty:1}]
    })
  }

  const remove = (id)=> setItems(prev=>prev.filter(p=>p.id!==id))
  const clear = ()=> setItems([])
  const updateQty = (id, qty)=> setItems(prev=>prev.map(p=>p.id===id?{...p, qty}:p))

  return (
    <CartContext.Provider value={{items, add, remove, clear, updateQty}}>
      {children}
    </CartContext.Provider>
  )
}

export default CartProvider
