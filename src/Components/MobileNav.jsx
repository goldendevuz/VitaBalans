import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaHome, FaSearch, FaShoppingCart, FaUser, FaInfoCircle } from 'react-icons/fa'

export default function MobileNav() {
    return (
        <nav className="mobile-bottom-nav" aria-label="mobile navigation">
            <NavLink to="/" end className={({ isActive }) => "mobile-item" + (isActive ? ' active' : '')}>
                <FaHome className="mobile-icon" />
                <span className="mobile-label">Bosh sahifa</span>
            </NavLink>

            <NavLink to="/about" className={({ isActive }) => "mobile-item" + (isActive ? ' active' : '')}>
                <FaInfoCircle className="mobile-icon" />
                <span className="mobile-label info">Biz haqimizda</span>
            </NavLink>

            <NavLink to="/catalog" className={({ isActive }) => "mobile-item" + (isActive ? ' active' : '')}>
                <FaSearch className="mobile-icon" />
                <span className="mobile-label">Katalog</span>
            </NavLink>

            <NavLink to="/cart" className={({ isActive }) => "mobile-item" + (isActive ? ' active' : '')}>
                <FaShoppingCart className="mobile-icon" />
                <span className="mobile-label">Savat</span>
            </NavLink>  

            <NavLink to="/profile" className={({ isActive }) => "mobile-item" + (isActive ? ' active' : '')}>
                <FaUser className="mobile-icon" />
                <span className="mobile-label">Kabinet</span>
            </NavLink>
        </nav>
    )
}
