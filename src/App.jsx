import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './Components/Layout'
import ScrollToTop from './Components/ScrollToTop'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import About from './Pages/About'
import Brands from './Pages/Brands'
import Profile from './Pages/Profile'
import Cart from './Pages/Cart'
import Checkout from './Pages/Checkout'
import Catalog from './Pages/Catalog'
import ProductDetail from './Pages/ProductDetail'
import AuthProvider from './contexts/AuthContext'
import CartProvider from './contexts/CartContext'

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='about' element={<About />} />
              <Route path='brands' element={<Brands />} />
              <Route path='profile' element={<Profile />} />
              <Route path='cart' element={<Cart />} />
              <Route path='checkout' element={<Checkout />} />
              <Route path='catalog' element={<Catalog />} />
              <Route path='product/:id' element={<ProductDetail />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
