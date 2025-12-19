import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebookF, FaInstagram, FaTelegram, FaYoutube, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import logo from '../assets/images/VitaBalansLogo.jpg'

function Footer() {
  const socials = [
    { icon: <FaFacebookF />, href: '#', color: '#1877f2' },
    { icon: <FaInstagram />, href: '#', color: '#e4405f' },
    { icon: <FaTelegram />, href: '#', color: '#0088cc' },
    { icon: <FaYoutube />, href: '#', color: '#ff0000' }
  ]

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

          <div className="footer-social" style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
            {socials.map((social, i) => (
              <a
                key={i}
                href={social.href}
                aria-label={`social-${i}`}
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
        <div className="footer-section footer-contact">
          <h4>Aloqa</h4>
          <div className="footer-links">
            <a href="tel:+998901234567" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaPhone /> +998 93 419 09 03
            </a>
            <a href="mailto:info@vitabalans.uz" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaEnvelope /> info@vitabalans.uz
            </a>
            <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FaMapMarkerAlt /> Namagan, O'zbekiston
            </span>

            <div className="footer-social-mobile" style={{ display: 'none', gap: '12px', marginTop: '12px' }}>
              {socials.map((s, i) => (
                <a key={i} href={s.href} style={{ width: '40px', height: '40px', borderRadius: '10px', background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b' }}>
                  {s.icon}
                </a>
              ))}
            </div>
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
