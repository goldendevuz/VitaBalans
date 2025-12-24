import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaShoppingBag, FaTag, FaSignOutAlt } from 'react-icons/fa'

function Profile() {
  const { user, logout, updateUser } = useContext(AuthContext)
  const [orders, setOrders] = useState([])

  const [activeTab, setActiveTab] = useState('profile')
  const [coupons, setCoupons] = useState([])
  const [loadingCoupons, setLoadingCoupons] = useState(true)
  const [couponsError, setCouponsError] = useState(null)
  const [showWelcome, setShowWelcome] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const o = JSON.parse(localStorage.getItem('vb_orders') || '[]')
    setOrders(o)

    try {
      const flag = sessionStorage.getItem('justLoggedIn')
      if (flag) {
        setShowWelcome(true)
        sessionStorage.removeItem('justLoggedIn')
        setTimeout(() => setShowWelcome(false), 4000)
      }
    } catch (e) { }
  }, [user])

  useEffect(() => {
    let mounted = true
    import('../lib/api').then(m => m.apiFetch('/coupons'))
      .then(res => res.json())
      .then(data => {
        if (!mounted) return
        setCoupons(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        if (!mounted) return
        setCoupons([])
        setCouponsError(err)
      })
      .finally(() => mounted && setLoadingCoupons(false))

    return () => { mounted = false }
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
  }



  if (!user) return (
    <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
      <div style={{
        width: '100px',
        height: '100px',
        margin: '0 auto 24px',
        background: 'linear-gradient(135deg, #ecfdf5, #f0fdfa)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <FaUser style={{ fontSize: '2.5rem', color: '#10b981' }} />
      </div>
      <h2 style={{ marginBottom: '12px' }}>Profilni ko'rish uchun kiring</h2>
      <p style={{ color: '#64748b', marginBottom: '32px' }}>
        Buyurtmalar tarixi va promo kodlarni ko'rish uchun hisobingizga kiring
      </p>
      <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link to="/login" className="btn primary">Kirish</Link>
        <Link to="/register" className="btn secondary">Ro'yxatdan o'tish</Link>
      </div>
    </div>
  )

  const tabs = [
    { id: 'profile', label: 'Profil', icon: <FaUser /> },
    { id: 'orders', label: 'Buyurtmalar', icon: <FaShoppingBag /> },
    { id: 'promos', label: 'Promo kodlar', icon: <FaTag /> },
  ]

  return (
    <div className="profile-page container">
      <div className="profile-grid">
        {/* Sidebar */}
        <div className="profile-sidebar">
          {/* User Info */}
          <div style={{ textAlign: 'center', marginBottom: '24px', paddingBottom: '24px', borderBottom: '1px solid #e2e8f0' }}>
            <div style={{
              width: '80px',
              height: '80px',
              margin: '0 auto 16px',
              background: 'linear-gradient(135deg, #10b981, #0ea5a3)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '2rem',
              fontWeight: '700'
            }}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <h3 style={{ marginBottom: '4px' }}>{user.name}</h3>
            <p style={{ color: '#64748b', fontSize: '0.9rem' }}>{user.email}</p>
          </div>

          {/* Tabs */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '14px 16px',
                  borderRadius: '12px',
                  border: 'none',
                  background: activeTab === tab.id ? 'linear-gradient(135deg, #ecfdf5, #f0fdfa)' : 'transparent',
                  color: activeTab === tab.id ? '#059669' : '#64748b',
                  fontWeight: activeTab === tab.id ? '600' : '500',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  textAlign: 'left'
                }}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
            <button
              onClick={handleLogout}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '14px 16px',
                borderRadius: '12px',
                border: 'none',
                background: 'transparent',
                color: '#ef4444',
                fontWeight: '500',
                fontSize: '0.95rem',
                cursor: 'pointer',
                marginTop: '8px'
              }}
            >
              <FaSignOutAlt /> Chiqish
            </button>
          </nav>
        </div>

        {/* Content */}
        <div className="profile-content">
          {showWelcome && (
            <div style={{ marginBottom: 20, padding: 16, borderRadius: 12, background: 'linear-gradient(135deg,#ecfdf5,#f0fdfa)', color: '#059669', fontWeight: 600 }}>
              Xush kelibsiz, {user.name}! Siz muvaffaqiyatli kirdingiz.
            </div>
          )}
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <h2 style={{ marginBottom: '24px' }}>Profil ma'lumotlari</h2>

              <div style={{ display: 'grid', gap: '16px' }}>
                {[
                  { icon: <FaUser />, label: 'Ism', value: user.name },
                  { icon: <FaEnvelope />, label: 'Email', value: user.email },
                  { icon: <FaPhone />, label: 'Telefon', value: user.phone || 'Kiritilmagan' },
                  { icon: <FaMapMarkerAlt />, label: 'Manzil', value: user.address || 'Kiritilmagan' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '14px',
                    background: '#f8fafc',
                    borderRadius: '10px'
                  }}>
                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '10px',
                      background: 'linear-gradient(135deg, #ecfdf5, #f0fdfa)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#10b981',
                      fontSize: '1rem'
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{item.label}</div>
                      <div style={{ fontWeight: '500', fontSize: '0.95rem' }}>{item.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h2 style={{ marginBottom: '32px' }}>Buyurtmalar tarixi</h2>
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📦</div>
                  <h3>Hali buyurtmalar yo'q</h3>
                  <p style={{ color: '#64748b', marginTop: '8px' }}>
                    Birinchi buyurtmangizni berish uchun katalogga o'ting
                  </p>
                  <Link to="/catalog" className="btn primary" style={{ marginTop: '20px' }}>
                    Katalogga o'tish
                  </Link>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {orders.map(o => (
                    <div key={o.id} style={{
                      padding: '20px',
                      background: '#f8fafc',
                      borderRadius: '12px'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <strong>Buyurtma #{o.id}</strong>
                        <span style={{ color: '#64748b', fontSize: '0.9rem' }}>
                          {new Date(o.when).toLocaleDateString()}
                        </span>
                      </div>
                      <div style={{ color: '#475569' }}>
                        {o.items.map(i => i.title + ' x' + i.qty).join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Promos Tab */}
          {activeTab === 'promos' && (
            <div>
              <h2 style={{ marginBottom: '20px', fontSize: '1.3rem' }}>Ishlatilgan promo kodlar</h2>
              {loadingCoupons ? (
                <div style={{ padding: 10, color: '#64748b', fontSize: '0.9rem' }}>Yuklanmoqda...</div>
              ) : couponsError ? (
                <div style={{ padding: 10, color: '#ef4444', fontSize: '0.9rem' }}>Xatolik yuz berdi</div>
              ) : coupons.length === 0 ? (
                <div style={{ padding: '30px 10px', textAlign: 'center', color: '#64748b' }}>
                  <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🎟️</div>
                  <p style={{ fontSize: '0.9rem' }}>faol promo kod yo'q</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {coupons.map((c, i) => (
                    <div key={c.id || i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      background: '#f8fafc',
                      borderRadius: '10px',
                      border: '1px solid #e2e8f0'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          background: 'linear-gradient(135deg, #ecfdf5, #f0fdfa)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#10b981',
                          fontSize: '0.9rem'
                        }}>
                          <FaTag />
                        </div>
                        <div>
                          <div style={{
                            fontFamily: 'monospace',
                            fontSize: '0.9rem',
                            fontWeight: '600',
                            color: '#059669'
                          }}>
                            {c.name || c.code || c.id}
                          </div>
                          {c.description && (
                            <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>{c.description}</div>
                          )}
                        </div>
                      </div>
                      <div style={{
                        background: '#10b981',
                        color: 'white',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        fontWeight: '600',
                        fontSize: '0.8rem'
                      }}>
                        -{c.type === 'percent' ? c.amount + '%' : Number(c.amount || 0).toLocaleString() + "so'm"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Wishlist removed per request */}
        </div>
      </div>

      <style>{`
        /* Keep small fallbacks but prefer CSS rules in index.css */
      `}</style>
    </div>
  )
}

export default Profile
