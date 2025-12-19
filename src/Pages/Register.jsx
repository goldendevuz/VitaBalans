import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa'
import logo from '../assets/images/VitaBalansLogo.jpg'
import { AuthContext } from '../contexts/AuthContext'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [error, setError] = useState('')
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const formatPhone = (value) => {
    const digits = value.replace(/\D/g, '')
    if (digits.length <= 2) return digits
    if (digits.length <= 5) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2, 5)} ${digits.slice(5)}`
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 5)} ${digits.slice(5, 7)} ${digits.slice(7, 9)}`
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhone(e.target.value)
    setFormData(prev => ({ ...prev, phone: formatted }))
  }

  const getPasswordStrength = () => {
    const { password } = formData
    if (!password) return { level: 0, text: '', color: '' }
    if (password.length < 6) return { level: 1, text: 'Juda qisqa', color: '#ef4444' }
    if (password.length < 8) return { level: 2, text: "O'rtacha", color: '#f59e0b' }
    if (/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
      return { level: 4, text: 'Kuchli', color: '#10b981' }
    }
    return { level: 3, text: 'Yaxshi', color: '#059669' }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    const { name, email, phone, password, confirmPassword } = formData

    if (!name || !email || !password) {
      setError("Iltimos, barcha maydonlarni to'ldiring")
      return
    }

    if (password.length < 6) {
      setError("Parol kamida 6 ta belgidan iborat bo'lishi kerak")
      return
    }

    if (password !== confirmPassword) {
      setError('Parollar mos kelmaydi')
      return
    }

    if (!agreed) {
      setError('Foydalanish shartlarini qabul qiling')
      return
    }

    login({ name, email, phone: '+998 ' + phone })
    navigate('/profile')
  }

  const strength = getPasswordStrength()

  const inputStyle = {
    width: '100%',
    padding: '16px 16px 16px 48px',
    border: '2px solid #e5e7eb',
    borderRadius: '12px',
    fontSize: '1rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    boxSizing: 'border-box'
  }

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontWeight: '500',
    color: '#374151'
  }

  const iconStyle = {
    position: 'absolute',
    left: '16px',
    top: '50%',
    transform: 'translateY(-50%)',
    color: '#9ca3af',
    fontSize: '1rem'
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
        <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>VitaBalans oilasiga qo'shiling!</h2>
        <p style={{ color: '#64748b', maxWidth: '400px', lineHeight: 1.7 }}>
          Ro'yxatdan o'ting va maxsus chegirmalar, yangi mahsulotlar
          va sog'liq bo'yicha maslahatlardan birinchi bo'lib xabardor bo'ling.
        </p>
      </div>

      {/* Right Side - Form */}
      <div className="auth-right">
        <div className="auth-form">
          <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Ro'yxatdan o'tish</h2>
          <p style={{ color: '#64748b', marginBottom: '32px' }}>Yangi hisob yarating</p>

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
            {/* Name */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>To'liq ism</label>
              <div style={{ position: 'relative' }}>
                <FaUser style={iconStyle} />
                <input
                  type="text"
                  name="name"
                  placeholder="Ismingizni kiriting"
                  value={formData.name}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#10b981'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Email</label>
              <div style={{ position: 'relative' }}>
                <FaEnvelope style={iconStyle} />
                <input
                  type="email"
                  name="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = '#10b981'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Telefon raqami</label>
              <div style={{ display: 'flex', gap: '0' }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '0 16px',
                  background: '#f3f4f6',
                  borderRadius: '12px 0 0 12px',
                  border: '2px solid #e5e7eb',
                  borderRight: 'none'
                }}>
                 <img style={{width:"23px"}} src="https://img.freepik.com/premium-photo/republic-uzbekistan-national-fabric-flag-textile-background-symbol-world-asian-country_113767-2072.jpg?semt=ais_hybrid&w=740&q=80" alt="" />
                  <span style={{ fontWeight: '500', color: '#374151' }}>+998</span>
                </div>
                <input
                  type="tel"
                  name="phone"
                  placeholder="(XX) XXX XX XX"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  maxLength={15}
                  style={{
                    ...inputStyle,
                    paddingLeft: '16px',
                    borderRadius: '0 12px 12px 0'
                  }}
                  onFocus={e => e.target.style.borderColor = '#10b981'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Parol</label>
              <div style={{ position: 'relative' }}>
                <FaLock style={iconStyle} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Kamida 6 ta belgi"
                  value={formData.password}
                  onChange={handleChange}
                  style={{ ...inputStyle, paddingRight: '48px' }}
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
              {/* Password Strength */}
              {formData.password && (
                <div style={{ marginTop: '10px' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '6px' }}>
                    {[1, 2, 3, 4].map(i => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: '4px',
                          borderRadius: '2px',
                          background: i <= strength.level ? strength.color : '#e5e7eb'
                        }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: '0.8rem', color: strength.color }}>
                    {strength.text}
                  </span>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div style={{ marginBottom: '20px' }}>
              <label style={labelStyle}>Parolni tasdiqlang</label>
              <div style={{ position: 'relative' }}>
                <FaLock style={iconStyle} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder="Parolni qayta kiriting"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  style={{ ...inputStyle, paddingRight: '48px' }}
                  onFocus={e => e.target.style.borderColor = '#10b981'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                />
                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                  <FaCheck style={{
                    position: 'absolute',
                    right: '16px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#10b981'
                  }} />
                )}
              </div>
            </div>

            {/* Terms */}
            <label style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
              cursor: 'pointer',
              marginBottom: '24px'
            }}>
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                style={{
                  width: '20px',
                  height: '20px',
                  marginTop: '2px',
                  accentColor: '#10b981'
                }}
              />
              <span style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.5 }}>
                Men <a href="#" style={{ color: '#10b981' }}>Foydalanish shartlari</a> va{' '}
                <a href="#" style={{ color: '#10b981' }}>Maxfiylik siyosati</a>ni qabul qilaman
              </span>
            </label>

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
              Ro'yxatdan o'tish
            </button>
          </form>

          <p style={{
            textAlign: 'center',
            marginTop: '24px',
            color: '#6b7280'
          }}>
            Hisobingiz bormi?{' '}
            <Link to="/login" style={{ color: '#10b981', fontWeight: '600' }}>
              Kirish
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
