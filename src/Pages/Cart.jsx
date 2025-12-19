import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { CartContext } from '../contexts/CartContext'
import { AuthContext } from '../contexts/AuthContext'
import { FaTrash, FaPlus, FaMinus, FaTag, FaArrowRight, FaShoppingBag, FaTruck, FaShieldAlt, FaUndo } from 'react-icons/fa'

const PROMOS = { 'VITA10': 0.1, 'WELCOME5': 0.05, 'FIRST20': 0.2 }

function Cart() {
  const { items, remove, updateQty, clear } = useContext(CartContext)
  const { user } = useContext(AuthContext)
  const [code, setCode] = useState('')
  const [applied, setApplied] = useState(null)
  const [promoError, setPromoError] = useState('')
  const [showNotification, setShowNotification] = useState(false)

  const subtotal = items.reduce((s, p) => s + p.price * p.qty, 0)
  const discount = applied ? subtotal * applied : 0
  const shipping = subtotal > 50 ? 0 : 5.99
  const total = subtotal - discount + shipping

  const apply = () => {
    const disc = PROMOS[code.toUpperCase()] || null
    if (disc) {
      setApplied(disc)
      setPromoError('')
    } else {
      setPromoError('Noto\'g\'ri promo kod')
      setApplied(null)
    }
  }

  const handleCheckout = () => {
    if (!user) {
      setShowNotification(true)
      setTimeout(() => setShowNotification(false), 3000)
      return
    }
    window.location.href = '/checkout'
  }

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{
          width: '140px',
          height: '140px',
          margin: '0 auto 24px',
          background: 'linear-gradient(135deg, #ecfdf5, #f0fdfa)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <FaShoppingBag style={{ fontSize: '3.5rem', color: '#10b981' }} />
        </div>
        <h2 style={{ marginBottom: '12px' }}>Savatingiz bo'sh</h2>
        <p style={{ color: '#64748b', marginBottom: '32px', maxWidth: '400px', margin: '0 auto 32px' }}>
          Ajoyib vitaminlar va qo'shimchalarni ko'rish uchun katalogga o'ting
        </p>
        <Link to="/catalog" className="btn primary">
          Katalogga o'tish <FaArrowRight style={{ marginLeft: '8px' }} />
        </Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
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
          <span>⚠️ Buyurtma berish uchun avval platformaga kiring!</span>
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

      <h1 style={{ marginBottom: '8px' }}>Savat</h1>
      <p style={{ color: '#64748b', marginBottom: '32px' }}>{items.length} ta mahsulot</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '32px',
        alignItems: 'start'
      }}>
        {/* Cart Items */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingBottom: '20px',
            borderBottom: '1px solid #e2e8f0',
            marginBottom: '20px'
          }}>
            <span style={{ fontWeight: '600' }}>Mahsulotlar</span>
            <button
              onClick={clear}
              style={{
                color: '#ef4444',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'none',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <FaTrash /> Tozalash
            </button>
          </div>

          {items.map(item => (
            <div key={item.id} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '20px',
              padding: '20px 0',
              borderBottom: '1px solid #f1f5f9'
            }}>
              <Link to={`/product/${item.id}`}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{
                    width: '100px',
                    height: '100px',
                    objectFit: 'contain',
                    background: '#f8fafc',
                    borderRadius: '12px',
                    padding: '12px'
                  }}
                />
              </Link>

              <div style={{ flex: 1 }}>
                <Link to={`/product/${item.id}`} style={{ textDecoration: 'none' }}>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1.05rem' }}>{item.title}</h4>
                </Link>
                <p style={{ color: '#64748b', margin: 0 }}>${item.price.toFixed(2)} / dona</p>
              </div>

              {/* Quantity Control */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f8fafc',
                borderRadius: '12px',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => updateQty(item.id, Math.max(1, item.qty - 1))}
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                >
                  <FaMinus />
                </button>
                <span style={{
                  width: '40px',
                  textAlign: 'center',
                  fontWeight: '600'
                }}>
                  {item.qty}
                </span>
                <button
                  onClick={() => updateQty(item.id, item.qty + 1)}
                  style={{
                    width: '40px',
                    height: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    color: '#64748b'
                  }}
                >
                  <FaPlus />
                </button>
              </div>

              <div style={{
                fontWeight: '700',
                fontSize: '1.1rem',
                color: '#10b981',
                minWidth: '80px',
                textAlign: 'right'
              }}>
                ${(item.price * item.qty).toFixed(2)}
              </div>

              <button
                onClick={() => remove(item.id)}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'transparent',
                  color: '#94a3b8',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        {/* Cart Summary */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          position: 'sticky',
          top: '100px'
        }}>
          <h3 style={{ marginBottom: '24px' }}>Buyurtma xulosasi</h3>

          {/* Promo Code */}
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <FaTag style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#94a3b8'
              }} />
              <input
                placeholder="Promo kod"
                value={code}
                onChange={e => setCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '14px 14px 14px 44px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '12px',
                  fontSize: '0.95rem'
                }}
              />
            </div>
            <button className="btn secondary" onClick={apply} style={{ padding: '14px 20px' }}>
              Qo'llash
            </button>
          </div>

          {promoError && (
            <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '16px' }}>
              {promoError}
            </p>
          )}

          {applied && (
            <div style={{
              background: 'linear-gradient(135deg, #ecfdf5, #f0fdfa)',
              color: '#059669',
              padding: '14px',
              borderRadius: '12px',
              fontSize: '0.9rem',
              marginBottom: '20px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: '500'
            }}>
              <FaTag /> {Math.round(applied * 100)}% chegirma qo'llanildi!
            </div>
          )}

          <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', color: '#475569' }}>
              <span>Mahsulotlar</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', color: '#475569' }}>
              <span>Chegirma</span>
              <span style={{ color: discount > 0 ? '#10b981' : 'inherit' }}>
                -${discount.toFixed(2)}
              </span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', color: '#475569' }}>
              <span>Yetkazib berish</span>
              <span>
                {shipping === 0 ? (
                  <span style={{ color: '#10b981', fontWeight: '500' }}>Bepul</span>
                ) : (
                  `$${shipping.toFixed(2)}`
                )}
              </span>
            </div>

            {subtotal < 50 && (
              <p style={{
                fontSize: '0.8rem',
                color: '#f59e0b',
                textAlign: 'center',
                padding: '12px',
                background: '#fffbeb',
                borderRadius: '8px',
                marginTop: '8px'
              }}>
                💡 $50 dan ortiq xarid qilsangiz, yetkazib berish bepul!
              </p>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '20px 0',
              marginTop: '12px',
              borderTop: '2px solid #e2e8f0',
              fontSize: '1.2rem',
              fontWeight: '700'
            }}>
              <span>Jami</span>
              <span style={{ color: '#10b981' }}>${total.toFixed(2)}</span>
            </div>
          </div>

          <button
            className="btn primary"
            onClick={handleCheckout}
            style={{ width: '100%', padding: '16px', fontSize: '1.05rem', marginTop: '8px' }}
          >
            Buyurtma berish <FaArrowRight style={{ marginLeft: '8px' }} />
          </button>

          <Link
            to="/catalog"
            className="btn outline"
            style={{ width: '100%', marginTop: '12px', display: 'flex', justifyContent: 'center' }}
          >
            Xaridni davom ettirish
          </Link>

          {/* Benefits */}
          <div style={{
            marginTop: '24px',
            paddingTop: '24px',
            borderTop: '1px solid #e2e8f0',
            display: 'grid',
            gap: '12px'
          }}>
            {[
              { icon: <FaTruck />, text: 'Tez yetkazib berish' },
              { icon: <FaShieldAlt />, text: 'Xavfsiz to\'lov' },
              { icon: <FaUndo />, text: 'Oson qaytarish' }
            ].map((b, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#64748b', fontSize: '0.9rem' }}>
                <span style={{ color: '#10b981' }}>{b.icon}</span>
                {b.text}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (max-width: 900px) {
          .container > div:last-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Cart
