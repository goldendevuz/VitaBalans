import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaStar, FaShoppingCart } from 'react-icons/fa'
import { CartContext } from '../contexts/CartContext'
import { AuthContext } from '../contexts/AuthContext'

function ProductCard({ product }) {
  const [showNotification, setShowNotification] = useState(false)
  const [notificationMsg, setNotificationMsg] = useState('')
  const [notificationInCard, setNotificationInCard] = useState(false)
  const { add } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const nav = useNavigate()
  // Prices in `products.js` are stored in so'm (integer). Display as localized UZS.

  const handleAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      setNotificationMsg('Xarid qilish uchun avval platformaga kiring!')
      setNotificationInCard(true)
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
      return
    }
    add(product)
    setNotificationMsg('Mahsulot savatga qo\'shildi')
    setNotificationInCard(true)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 1500)
  }

  const avgRating = product.rating || 4.8

  return (
    <>
      <Link to={`/product/${product.id}`} className="card product-card" style={{ textDecoration: 'none' }}>
        {/* Notification (in-card) */}
        {showNotification && (
          <div className={`vb-toast in-card`} role="status">
            <span>{notificationMsg}</span>
            {!user && (
              <Link to="/login" className="vb-toast-cta">Kirish</Link>
            )}
          </div>
        )}
        {/* Sale badge (top-left) - compute percent when oldPrice exists */}
        {(() => {
          const hasDiscount = product.oldPrice && product.oldPrice > product.price
          const discountPct = hasDiscount ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) : null
          if (product.discountLabel) return <div className="badge-sale">{product.discountLabel}</div>
          if (discountPct) return <div className="badge-sale">-{discountPct}%</div>
          return null
        })()}

        {/* Product Image */}
        <div className="card-image-wrapper product-image" style={{ padding: 8 }}>
          <img src={product.image} alt={product.title} style={{ width: '100%', objectFit: 'contain', borderRadius: 12, display: 'block' }} />
        </div>

        {/* Product Info */}
        <div className="card-body">
          <h3 className="card-title">{product.title}</h3>

          <p className="card-description">{product.description}</p>

          <div className="rating" aria-hidden style={{ margin: '8px 0' }}>
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} color="#f5b50a" style={{ width: 16, height: 16 }} />
            ))}
          </div>

          <div className="old-price">
            {product.oldPrice ? (
              <span style={{ textDecoration: 'line-through', color: 'var(--text-muted)' }}>{Math.round(product.oldPrice).toLocaleString('uz-UZ')} so'm</span>
            ) : null}
            {/* Always show availability so user can see if product is in stock */}
            <span className={`availability ${product.available ? 'available' : 'unavailable'}`} style={{ marginLeft: product.oldPrice ? 12 : 0 }}>
              {product.available ? 'Mavjud' : 'Mavjud emas'}
            </span>
          </div>

          <div className="price">{Math.round(product.price).toLocaleString('uz-UZ')} so'm</div>

          <div className="card-footer">
            <button
              className={`btn primary full-width ${product.available ? '' : 'disabled'}`}
              onClick={handleAdd}
              style={{ padding: '8px 12px', fontSize: '0.85rem' }}
              disabled={!product.available}
            >
              {product.available ? "Savatga qo'shish" : 'Mavjud emas'}
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
