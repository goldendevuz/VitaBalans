import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa'
import logo from '../assets/images/VitaBalansLogo.jpg'
import { AuthContext } from '../contexts/AuthContext'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Iltimos, barcha maydonlarni to\'ldiring')
      return
    }

    login({ email, name: email.split('@')[0] })
    navigate('/profile')
  }

  return (
    <div className="auth-page">
      {/* Left Side - Branding */}
      <div className="auth-left">
        <Link to="/" style={{ display: 'block' }}>
          <img
            src={logo}
            alt="VitaBalans"
            style={{
              width: '140px',
              height: '140px',
              borderRadius: '24px',
              boxShadow: '0 20px 50px rgba(16, 185, 129, 0.2)',
              marginBottom: '32px',
              objectFit: 'cover'
            }}
          />
        </Link>
        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>VitaBalans ga xush kelibsiz!</h2>
        <p style={{ color: '#64748b', maxWidth: '400px', lineHeight: 1.7 }}>
          Sog'lom hayot yo'lida sizga yordam berish uchun tabiiy vitaminlar
          va qo'shimchalar kolleksiyasini kashf eting.
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="auth-right">
        <div className="auth-form">
          {/* Logo for mobile */}
          <Link to="/" style={{ display: 'block', textAlign: 'center', marginBottom: '24px' }}>
            <img
              src={logo}
              alt="VitaBalans"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '16px',
                display: 'none'
              }}
              className="mobile-logo"
            />
          </Link>

          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Kirish</h2>
          <p style={{ color: '#64748b', marginBottom: '32px' }}>Hisobingizga kiring</p>

          {error && (
            <div style={{
              background: '#fee2e2',
              color: '#dc2626',
              padding: '12px 16px',
              borderRadius: '12px',
              marginBottom: '20px',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Email
              </label>
              <div style={{ position: 'relative' }}>
                <FaEnvelope style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  fontSize: '1rem'
                }} />
                <input
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 16px 16px 48px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.borderColor = '#10b981'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: '500',
                color: '#374151'
              }}>
                Parol
              </label>
              <div style={{ position: 'relative' }}>
                <FaLock style={{
                  position: 'absolute',
                  left: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#9ca3af',
                  fontSize: '1rem'
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '16px 48px 16px 48px',
                    border: '2px solid #e5e7eb',
                    borderRadius: '12px',
                    fontSize: '1rem',
                    outline: 'none',
                    transition: 'border-color 0.2s',
                    boxSizing: 'border-box'
                  }}
                  onFocus={e => e.target.style.borderColor = '#10b981'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'none',
                    border: 'none',
                    color: '#9ca3af',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <label style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                cursor: 'pointer'
              }}>
                <input
                  type="checkbox"
                  style={{
                    width: '18px',
                    height: '18px',
                    accentColor: '#10b981'
                  }}
                />
                <span style={{ fontSize: '0.9rem', color: '#6b7280' }}>Meni eslab qol</span>
              </label>
              <a href="#" style={{ fontSize: '0.9rem', color: '#10b981', fontWeight: '500' }}>
                Parolni unutdingizmi?
              </a>
            </div>

            <button
              type="submit"
              className="btn primary"
              style={{
                width: '100%',
                padding: '16px',
                fontSize: '1rem',
                borderRadius: '12px'
              }}
            >
              Kirish
            </button>
          </form>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            margin: '24px 0',
            color: '#9ca3af'
          }}>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
            <span>yoki</span>
            <div style={{ flex: 1, height: '1px', background: '#e5e7eb' }} />
          </div>

          <button
            className="btn outline"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px'
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Google bilan kirish
          </button>

          <p style={{
            textAlign: 'center',
            marginTop: '24px',
            color: '#6b7280'
          }}>
            Hisobingiz yo'qmi?{' '}
            <Link to="/register" style={{ color: '#10b981', fontWeight: '600' }}>
              Ro'yxatdan o'ting
            </Link>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .mobile-logo { display: block !important; }
        }
      `}</style>
    </div>
  )
}

export default Login
