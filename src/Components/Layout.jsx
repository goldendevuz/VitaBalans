import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import MobileNav from './MobileNav'

function Layout() {
  return (
    <div>
      <Header />
      <Outlet />
      <Footer />
      <MobileNav />
    </div>
  )
}

export default Layout
