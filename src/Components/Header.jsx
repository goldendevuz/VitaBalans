import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaShoppingCart, FaUser, FaBars, FaTimes, FaSignOutAlt, FaTags } from 'react-icons/fa'
import logo from '../assets/images/VitaBalansLogo.jpg'
import { CartContext } from '../contexts/CartContext'
import { AuthContext } from '../contexts/AuthContext'

function Header() {
  const [open, setOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { items } = useContext(CartContext)
  const { user, logout } = useContext(AuthContext)
  const nav = useNavigate()

  const handleLogout = () => {
    logout()
    setShowUserMenu(false)
    nav('/')
  }

  const totalItems = items.reduce((s, i) => s + i.qty, 0)

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <img src={logo} alt="VitaBalans" className="logo" />
          <span className="brand-text">VitaBalans</span>
        </Link>

        {/* Navigation */}
        <nav className={`main-nav ${open ? 'open' : ''}`}>
          <Link to="/" onClick={() => setOpen(false)}>Bosh sahifa</Link>
          <Link to="/brands" onClick={() => setOpen(false)}>Brendlar</Link>
          <Link to="/blog" onClick={() => setOpen(false)}>Blog</Link>
          <Link to="/about" onClick={() => setOpen(false)}>Biz haqimizda</Link>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {user ? (
            <div style={{ position: 'relative' }}>
              <button
                className="icon"
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  background: showUserMenu ? 'var(--primary-50)' : 'transparent',
                  color: showUserMenu ? 'var(--primary-600)' : 'inherit'
                }}
              >
                <FaUser />
              </button>

              {showUserMenu && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: 'white',
                  borderRadius: '12px',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                  minWidth: '200px',
                  padding: '8px',
                  zIndex: 100
                }}>
                  <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #e2e8f0',
                    marginBottom: '8px'
                  }}>
                    <div style={{ fontWeight: '600', fontSize: '0.95rem' }}>{user.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{user.email}</div>
                  </div>
                  <Link
                    to="/profile"
                    onClick={() => setShowUserMenu(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      color: '#475569',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = '#f1f5f9'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <FaUser /> Profil
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 16px',
                      borderRadius: '8px',
                      color: '#ef4444',
                      width: '100%',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={e => e.currentTarget.style.background = '#fef2f2'}
                    onMouseOut={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <FaSignOutAlt /> Chiqish
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="btn primary hide-mobile" style={{ padding: '10px 20px' }}>
              Kirish
            </Link>
          )}

          {/* Catalog CTA removed per request */}

          {/* Cart */}
          <Link to="/cart" id="cart-link" className="icon" title="Savat">
            <FaShoppingCart />
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
          </Link>

          {/* Mobile-only: Brands + Profile icons */}
          <Link to="/brands" className="icon show-mobile-only" title="Brendlar">
            <FaTags />
          </Link>

          {user ? (
            <Link to="/profile" className="icon show-mobile-only" title="Profil">
              <FaUser />
            </Link>
          ) : (
            <Link to="/login" className="icon show-mobile-only" title="Kirish">
              <FaUser />
            </Link>
          )}

          {/* Kabinet removed from header as requested */}

          {/* Mobile Menu Toggle */}
          <button
            className="icon mobile-menu"
            onClick={() => setOpen(o => !o)}
            aria-label="menu"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Nav backdrop for mobile when menu is open */}
      {open && (
        <div
          className="nav-backdrop"
          onClick={() => setOpen(false)}
          aria-hidden
        />
      )}

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50
          }}
          onClick={() => setShowUserMenu(false)}
        />
      )}
    </header>
  )
}

export default Header
