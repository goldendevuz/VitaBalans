import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../contexts/AuthContext'
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaEdit, FaShoppingBag, FaTag, FaSignOutAlt, FaHeart, FaCog } from 'react-icons/fa'

function Profile() {
  const { user, logout, updateUser } = useContext(AuthContext)
  const [orders, setOrders] = useState([])
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({})
  const [activeTab, setActiveTab] = useState('profile')
  const navigate = useNavigate()

  useEffect(() => {
    const o = JSON.parse(localStorage.getItem('vb_orders') || '[]')
    setOrders(o)
    if (user) {
      setEditData({ name: user.name, phone: user.phone || '', address: user.address || '' })
    }
  }, [user])

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  const handleSave = () => {
    updateUser(editData)
    setIsEditing(false)
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
    { id: 'wishlist', label: 'Sevimlilar', icon: <FaHeart /> },
  ]

  return (
    <div className="container" style={{ padding: '40px 24px 80px' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '280px 1fr',
        gap: '32px',
        alignItems: 'start'
      }}>
        {/* Sidebar */}
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
          position: 'sticky',
          top: '100px'
        }}>
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
        <div style={{
          background: 'white',
          borderRadius: '20px',
          padding: '32px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
        }}>
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <h2 style={{ margin: 0 }}>Profil ma'lumotlari</h2>
                <button
                  className="btn outline"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <FaEdit style={{ marginRight: '8px' }} />
                  {isEditing ? 'Bekor qilish' : 'Tahrirlash'}
                </button>
              </div>

              {isEditing ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      To'liq ism
                    </label>
                    <input
                      type="text"
                      value={editData.name}
                      onChange={e => setEditData({ ...editData, name: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Telefon
                    </label>
                    <input
                      type="tel"
                      value={editData.phone}
                      onChange={e => setEditData({ ...editData, phone: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#475569' }}>
                      Manzil
                    </label>
                    <textarea
                      value={editData.address}
                      onChange={e => setEditData({ ...editData, address: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        border: '2px solid #e2e8f0',
                        borderRadius: '12px',
                        fontSize: '1rem',
                        minHeight: '100px',
                        resize: 'vertical'
                      }}
                    />
                  </div>
                  <button className="btn primary" onClick={handleSave} style={{ alignSelf: 'flex-start' }}>
                    Saqlash
                  </button>
                </div>
              ) : (
                <div style={{ display: 'grid', gap: '24px' }}>
                  {[
                    { icon: <FaUser />, label: 'Ism', value: user.name },
                    { icon: <FaEnvelope />, label: 'Email', value: user.email },
                    { icon: <FaPhone />, label: 'Telefon', value: user.phone || 'Kiritilmagan' },
                    { icon: <FaMapMarkerAlt />, label: 'Manzil', value: user.address || 'Kiritilmagan' },
                  ].map((item, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '20px',
                      background: '#f8fafc',
                      borderRadius: '12px'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '12px',
                        background: 'linear-gradient(135deg, #ecfdf5, #f0fdfa)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#10b981',
                        fontSize: '1.2rem'
                      }}>
                        {item.icon}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.85rem', color: '#64748b' }}>{item.label}</div>
                        <div style={{ fontWeight: '500' }}>{item.value}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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
              <h2 style={{ marginBottom: '32px' }}>Promo kodlar</h2>
              <div style={{ display: 'grid', gap: '16px' }}>
                {[
                  { code: 'VITA10', discount: '10%', desc: 'Barcha mahsulotlar uchun' },
                  { code: 'WELCOME5', discount: '5%', desc: 'Yangi foydalanuvchilar uchun' },
                  { code: 'FIRST20', discount: '20%', desc: 'Birinchi buyurtma uchun' },
                ].map((promo, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '20px',
                    background: 'linear-gradient(135deg, #ecfdf5, #f0fdfa)',
                    borderRadius: '12px',
                    border: '2px dashed #10b981'
                  }}>
                    <div>
                      <div style={{
                        fontFamily: 'monospace',
                        fontSize: '1.2rem',
                        fontWeight: '700',
                        color: '#059669',
                        marginBottom: '4px'
                      }}>
                        {promo.code}
                      </div>
                      <div style={{ color: '#64748b', fontSize: '0.9rem' }}>{promo.desc}</div>
                    </div>
                    <div style={{
                      background: '#10b981',
                      color: 'white',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      fontWeight: '700'
                    }}>
                      -{promo.discount}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wishlist Tab */}
          {activeTab === 'wishlist' && (
            <div>
              <h2 style={{ marginBottom: '32px' }}>Sevimlilar</h2>
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div style={{ fontSize: '3rem', marginBottom: '16px' }}>❤️</div>
                <h3>Sevimlilar ro'yxati bo'sh</h3>
                <p style={{ color: '#64748b', marginTop: '8px' }}>
                  Mahsulotlarni sevimlilar ro'yxatiga qo'shing
                </p>
                <Link to="/catalog" className="btn primary" style={{ marginTop: '20px' }}>
                  Katalogga o'tish
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .container > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default Profile
