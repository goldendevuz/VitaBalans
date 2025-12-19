import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ProductCard from '../Components/ProductCard'
import products from '../data/products'
import { FaArrowRight, FaLeaf, FaHeart, FaStar, FaShieldAlt, FaSearch } from 'react-icons/fa'

function Home() {
  const [index, setIndex] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const navigate = useNavigate()

  useEffect(() => {
    const t = setInterval(() => setIndex(i => (i + 1) % products.length), 5000)
    return () => clearInterval(t)
  }, [])

  const handleSearch = (e) => {
    e.preventDefault()
    navigate('/catalog?q=' + encodeURIComponent(searchQuery))
  }

  const features = [
    { icon: <FaLeaf />, title: "100% Tabiiy", desc: "Faqat tabiiy ingredientlar" },
    { icon: <FaHeart />, title: "Sog'liq uchun", desc: "Salomatlik kafolati" },
    { icon: <FaStar />, title: "Premium sifat", desc: "Eng yuqori standartlar" },
    { icon: <FaShieldAlt />, title: "Sertifikatlangan", desc: "Xalqaro sertifikat" },
  ]

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-slider">
          {products.map((p, i) => (
            <div key={p.id} className={"slide" + (i === index ? ' active' : '')}>
              <div className="hero-content">
                <span style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, #10b981, #0ea5a3)',
                  color: 'white',
                  padding: '6px 16px',
                  borderRadius: '20px',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  marginBottom: '16px'
                }}>
                  🌿 Yangi kolleksiya
                </span>
                <h1>{p.title}</h1>
                <p>{p.description}</p>
                <div className="hero-actions">
                  <Link to="/catalog" className="btn primary">
                    Xarid qilish <FaArrowRight />
                  </Link>
                  <Link to="/about" className="btn secondary">
                    Batafsil
                  </Link>
                </div>
              </div>
              <img src={p.image} className="hero-image" alt={p.title} />
            </div>
          ))}

          {/* Slider Dots */}
          <div className="hero-dots">
            {products.map((_, i) => (
              <button
                key={i}
                className={"hero-dot" + (i === index ? ' active' : '')}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Search Section - Below Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #ecfdf5 100%)',
        padding: '40px 0'
      }}>
        <div className="container">
          <form onSubmit={handleSearch} style={{
            display: 'flex',
            gap: '16px',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            <div style={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(16, 185, 129, 0.1)',
              padding: '4px',
              border: '2px solid #e2e8f0'
            }}>
              <FaSearch style={{
                position: 'absolute',
                left: '20px',
                color: '#94a3b8',
                fontSize: '1.1rem'
              }} />
              <input
                type="text"
                placeholder="Mahsulot qidirish..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '16px 16px 16px 52px',
                  border: 'none',
                  background: 'transparent',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
            </div>
            <Link
              to="/catalog"
              className="btn primary"
              style={{
                padding: '16px 32px',
                borderRadius: '14px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}
            >
              Katalog <FaArrowRight />
            </Link>
          </form>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: '60px 0', background: '#ffffff' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '24px'
          }}>
            {features.map((f, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '24px',
                background: '#f8fafc',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(16, 185, 129, 0.08)'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #ecfdf5, #f0fdfa)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  color: '#10b981'
                }}>
                  {f.icon}
                </div>
                <div>
                  <h4 style={{ margin: '0 0 4px', fontSize: '1rem' }}>{f.title}</h4>
                  <p style={{ margin: 0, color: '#64748b', fontSize: '0.9rem' }}>{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="products container">
        <h2>Mashhur Mahsulotlar</h2>
        <div className="grid">
          {products.slice(0, 4).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/catalog" className="btn primary">
            Barcha mahsulotlar <FaArrowRight />
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #10b981, #0ea5a3)',
        padding: '80px 0',
        marginTop: '60px'
      }}>
        <div className="container" style={{ textAlign: 'center', color: 'white' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '16px', color: 'white' }}>
            Sog'lom hayot – sizning tanlovingiz!
          </h2>
          <p style={{ fontSize: '1.2rem', opacity: 0.9, marginBottom: '32px', maxWidth: '600px', margin: '0 auto 32px' }}>
            VitaBalans bilan tabiiy vitaminlar va qo'shimchalar orqali sog'lig'ingizni mustahkamlang.
          </p>
          <Link to="/register" className="btn" style={{
            background: 'white',
            color: '#10b981',
            padding: '16px 32px',
            fontSize: '1.1rem'
          }}>
            Hoziroq boshlash
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home
