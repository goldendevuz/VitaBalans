import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTelegram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import logo from '../assets/images/VitaBalansLogo.jpg'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        {/* Brand Section */}
        <div className="footer-brand">
          <Link to="/" className="brand" style={{ marginBottom: '16px' }}>
            <img src={logo} alt="VitaBalans" className="logo" />
            <span className="brand-text">VitaBalans</span>
          </Link>
          <p>
            Tabiiy vitaminlar va qo'shimchalar bilan muvozanatli hayot.
            Sog'lig'ingizni biz bilan birga mustahkamlang.
          </p>

          {/* Social Icons */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            {[
              { icon: <FaFacebookF />, href: '#', color: '#1877f2' },
              { icon: <FaInstagram />, href: '#', color: '#e4405f' },
              { icon: <FaTelegram />, href: '#', color: '#0088cc' },
              { icon: <FaYoutube />, href: '#', color: '#ff0000' }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: '#f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#64748b',
                  transition: 'all 0.3s'
                }}
                onMouseOver={e => {
                  e.currentTarget.style.background = social.color
                  e.currentTarget.style.color = 'white'
                }}
                onMouseOut={e => {
                  e.currentTarget.style.background = '#f1f5f9'
                  e.currentTarget.style.color = '#64748b'
                }}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h4>Tezkor havolalar</h4>
          <div className="footer-links">
            <Link to="/">Bosh sahifa</Link>
            <Link to="/catalog">Katalog</Link>
            <Link to="/brands">Brendlar</Link>
            <Link to="/about">Biz haqimizda</Link>
          </div>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h4>Kategoriyalar</h4>
          <div className="footer-links">
            <Link to="/catalog">Vitaminlar</Link>
            <Link to="/catalog">Energiya</Link>
            <Link to="/catalog">Immunitet</Link>
            <Link to="/catalog">Go'zallik</Link>
          </div>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h4>Aloqa</h4>
          <div className="footer-links">
            <a href="tel:+998901234567" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaPhone /> +998 90 123 45 67
            </a>
            <a href="mailto:info@vitabalans.uz" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaEnvelope /> info@vitabalans.uz
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaMapMarkerAlt /> Toshkent, O'zbekiston
            </span>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} VitaBalans. Barcha huquqlar himoyalangan.</p>
      </div>
    </footer>
  )
}

export default Footer
