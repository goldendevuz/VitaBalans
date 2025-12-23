import React, { useState, useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import useProducts from '../hooks/useProducts'
import ProductCard from '../Components/ProductCard'
import Spinner from '../Components/Spinner'
import { FaSearch, FaArrowRight } from 'react-icons/fa'

function Catalog() {
  const { products, categories, loading, error } = useProducts()
  const [searchParams] = useSearchParams()
  const initialQuery = searchParams.get('q') || ''
  const paramMin = searchParams.get('min') || ''
  const paramMax = searchParams.get('max') || ''
  const paramCategory = searchParams.get('category') || 'all'
  const paramSort = searchParams.get('sort') || 'default'

  const [query, setQuery] = useState(initialQuery)
  const [selectedCategory, setSelectedCategory] = useState(paramCategory)
  const [sortBy, setSortBy] = useState(paramSort)
  const [priceRange, setPriceRange] = useState({ min: paramMin, max: paramMax })

  const filteredProducts = useMemo(() => {
    let result = [...products]

    // Filter by search query
    if (query) {
      result = result.filter(p =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.description.toLowerCase().includes(query.toLowerCase())
      )
    }

    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(p => p.category === selectedCategory)
    }

    // Filter by price range
    const minVal = priceRange.min !== '' ? Number(priceRange.min) : null
    const maxVal = priceRange.max !== '' ? Number(priceRange.max) : null
    if (minVal !== null && !Number.isNaN(minVal)) {
      result = result.filter(p => p.price >= minVal)
    }
    if (maxVal !== null && !Number.isNaN(maxVal)) {
      result = result.filter(p => p.price <= maxVal)
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => (b.rating || 0) - (a.rating || 0))
        break
      default:
        break
    }

    return result
  }, [products, query, selectedCategory, sortBy, priceRange])

  return (
    <div>
      {/* Hero Banner */}
      <section style={{
        background: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 50%, #ffffff 100%)',
        padding: '60px 0',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-10%',
          width: '60%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(16, 185, 129, 0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <h1 style={{
            fontSize: '2.8rem',
            marginBottom: '16px',
            background: 'linear-gradient(135deg, #0f172a 0%, #047857 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Mahsulotlar Katalogi
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#475569', marginBottom: '32px', maxWidth: '600px' }}>
            Tabiiy vitaminlar va qo'shimchalar kolleksiyasini kashf eting. Sog'liq uchun eng yaxshi tanlov.
          </p>

          {/* Search Input */}
          <div style={{
            display: 'flex',
            gap: '16px',
            maxWidth: '600px'
          }}>
            <div style={{
              flex: 1,
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              background: 'white',
              borderRadius: '16px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              padding: '4px'
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                style={{
                  flex: 1,
                  padding: '16px 16px 16px 52px',
                  border: 'none',
                  background: 'transparent',
                  fontSize: '1rem',
                  outline: 'none'
                }}
              />
              <button
                className="btn primary"
                style={{ padding: '10px 16px', borderRadius: '10px' }}
              >
                Qidirish
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container" style={{ padding: '40px 24px 80px' }}>
        {loading && <Spinner />}
        {!loading && error && (
          <div className="card" style={{ padding: 20, marginBottom: 16, color: '#b91c1c' }}>
            Mahsulotlarni yuklashda xato: {error.message}
          </div>
        )}
        <div className="catalog-main-grid" style={{
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          gap: '28px',
          alignItems: 'start'
        }}>
          {/* Sidebar - Left */}
          <aside className="catalog-sidebar-box" style={{
            background: 'white',
            borderRadius: '20px',
            padding: '24px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
            position: 'sticky',
            top: '100px'
          }}>
            {/* Categories */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#64748b',
                marginBottom: '16px'
              }}>
                Kategoriyalar
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: 'none',
                      background: selectedCategory === cat.id
                        ? 'linear-gradient(135deg, #ecfdf5, #f0fdfa)'
                        : 'transparent',
                      color: selectedCategory === cat.id ? '#059669' : '#475569',
                      fontWeight: selectedCategory === cat.id ? '600' : '500',
                      fontSize: '15px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s',
                      borderLeft: selectedCategory === cat.id ? '3px solid #10b981' : '3px solid transparent'
                    }}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#64748b',
                marginBottom: '16px'
              }}>
                Narx oralig'i
              </h4>
              <div style={{ display: 'flex', gap: '12px' }}>
                <input
                  type="number"
                  placeholder="Min $"
                  value={priceRange.min}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                <input
                  type="number"
                  placeholder="Max $"
                  value={priceRange.max}
                  onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                  style={{
                    flex: 1,
                    padding: '12px',
                    border: '2px solid #e2e8f0',
                    borderRadius: '10px',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Sort */}
            <div style={{ marginBottom: '28px' }}>
              <h4 style={{
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#64748b',
                marginBottom: '16px'
              }}>
                Saralash
              </h4>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '2px solid #e2e8f0',
                  borderRadius: '10px',
                  fontSize: '0.95rem',
                  background: 'white',
                  cursor: 'pointer',
                  outline: 'none'
                }}
              >
                <option value="default">Standart</option>
                <option value="price-low">Narx: arzondan qimmatga</option>
                <option value="price-high">Narx: qimmatdan arzonga</option>
                <option value="rating">Reyting bo'yicha</option>
              </select>
            </div>

            {/* Reset Filters */}
            <button
              onClick={() => {
                setQuery('')
                setSelectedCategory('all')
                setSortBy('default')
                setPriceRange({ min: '', max: '' })
              }}
              className="btn outline"
              style={{ width: '100%' }}
            >
              Filterni tozalash
            </button>
          </aside>

          {/* Products Grid - Right */}
          <main className="catalog-products-area">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <p style={{ color: '#64748b' }}>
                <strong style={{ color: '#0f172a' }}>{filteredProducts.length}</strong> ta mahsulot topildi
              </p>
            </div>

            {filteredProducts.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '80px 20px',
                background: 'white',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
              }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
                <h3 style={{ marginBottom: '12px' }}>Mahsulot topilmadi</h3>
                <p style={{ color: '#64748b', marginBottom: '24px' }}>
                  Boshqa qidiruv so'zi yoki kategoriya tanlang
                </p>
                <button
                  className="btn primary"
                  onClick={() => {
                    setQuery('')
                    setSelectedCategory('all')
                  }}
                >
                  Barcha mahsulotlarni ko'rish
                </button>
              </div>
            ) : (
              <div className="grid">
                {filteredProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .catalog-main-grid {
            grid-template-columns: 1fr !important;
          }
          /* Show categories first on small screens (tepadan) so the menu appears above products */
          .catalog-sidebar-box {
            position: static !important;
            order: 1;
            max-height: none !important;
            overflow: visible !important;
          }
          .catalog-products-area {
            order: 2;
          }
        }
      `}</style>
    </div>
  )
}

export default Catalog
