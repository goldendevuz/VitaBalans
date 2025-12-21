import React, { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
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
import NotFound from './Pages/NotFound'
import AuthProvider from './contexts/AuthContext'
import CartProvider from './contexts/CartContext'
import Loader from './Components/Loader'

function App() {
  function RouterWithLoader() {
    const location = useLocation()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
      setLoading(true)
      const t = setTimeout(() => setLoading(false), 600)
      return () => clearTimeout(t)
    }, [location.pathname])

    return (
      <>
        {loading && <Loader />}
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
          <Route path='*' element={<NotFound />} />
        </Routes>
      </>
    )
  }

  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <RouterWithLoader />
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}

export default App
