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
  // Default exchange rate: 1 USD -> 11500 UZS (adjustable)
  const EXCHANGE_RATE = 11500

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

      <Link to={`/product/${product.id}`} className="card" style={{ textDecoration: 'none', background: '#e2e8f0', border: '1px solid rgba(15,23,42,0.06)', boxShadow: '0 6px 18px rgba(2,6,23,0.06)' }}>
        {/* Quick Add Button */}
        <button className="top-action" onClick={handleAdd} aria-label="Savatga qo'shish">
          <FaShoppingCart style={{ marginRight: '6px' }} />
          Savatga
        </button>

        {/* Product Image (use background with darker overlay) */}
        <div className="card-image-wrapper" style={{ padding: 8 }}>
          <img src={product.image} alt={product.title} style={{ width: '100%', height: 160, objectFit: 'cover', borderRadius: 12, display: 'block', boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.02)' }} />
        </div>

        {/* Product Info */}
        <div className="card-body">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {product.category && <span className="chip">{product.category}</span>}
              {product.rating >= 4.8 && <span className="badge-top">Eng ko'p sotilgan</span>}
            </div>
            <div style={{ color: 'var(--text-muted)', fontSize: 12 }}>{product.weight || ''}</div>
          </div>

          <h3 className="card-title">{product.title}</h3>
          <p className="card-description">{product.description}</p>
          {/** Convert USD price to UZS and display without $ sign */}
          <p className="card-price">{Math.round(product.price * EXCHANGE_RATE).toLocaleString('uz-UZ')} so'm</p>
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
