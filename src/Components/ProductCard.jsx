import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaStar, FaShoppingCart } from 'react-icons/fa'
import { CartContext } from '../contexts/CartContext'
import { AuthContext } from '../contexts/AuthContext'

function ProductCard({ product }) {
  const [showNotification, setShowNotification] = useState(false)
  const { add } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const nav = useNavigate()

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
      return
    }
    add(product)
    nav('/cart')
  }

  const avgRating = product.rating || 4.8

  return (
    <>
      {/* Notification */}
      {showNotification && (
        <div style={{
          position: 'fixed',
          top: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'linear-gradient(135deg, #f59e0b, #d97706)',
          color: 'white',
          padding: '16px 32px',
          borderRadius: '12px',
          boxShadow: '0 10px 40px rgba(245, 158, 11, 0.3)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          animation: 'slideDown 0.3s ease'
        }}>
          <span>⚠️ Xarid qilish uchun avval platformaga kiring!</span>
          <Link to="/login" style={{
            background: 'white',
            color: '#d97706',
            padding: '8px 16px',
            borderRadius: '8px',
            fontWeight: '600'
          }}>
            Kirish
          </Link>
        </div>
      )}

      <Link to={`/product/${product.id}`} className="card" style={{ textDecoration: 'none' }}>
        {/* Quick Add Button */}
        <button className="top-action" onClick={handleAdd} aria-label="Add to cart">
          <FaShoppingCart style={{ marginRight: '6px' }} />
          Savatga
        </button>

        {/* Product Image */}
        <div className="card-image-wrapper">
          <img src={product.image} alt={product.title} className="card-image" />
        </div>

        {/* Product Info */}
        <div className="card-body">
          <h3 className="card-title">{product.title}</h3>
          <p className="card-description">{product.description}</p>
          <p className="card-price">${product.price.toFixed(2)}</p>
          <div className="card-footer">
            <div className="rating">
              <FaStar color="#f5b50a" />
              <span>{avgRating}</span>
            </div>
            <button className="btn primary" onClick={handleAdd} style={{ padding: '8px 16px' }}>
              Sotib olish
            </button>
          </div>
        </div>
      </Link>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </>
  )
}

export default ProductCard
