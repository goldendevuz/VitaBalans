import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { categories } from '../data/products'
import products from '../data/products'
import ProductCard from '../Components/ProductCard'

export default function Toplam() {
  const [selected, setSelected] = useState('all')


  const nav = useNavigate()

  const goToCategory = (catId) => {
    nav(`/toplam/${encodeURIComponent(catId)}`)
  }

  return (
    <div className="container">
      <nav style={{ margin: '18px 0', fontSize: '0.95rem', color: 'var(--primary-600)' }}>
        <a href="/">Bosh sahifa</a> » <span style={{ marginLeft: 6 }}>To'plamlar</span>
      </nav>

      <h1 style={{ margin: '8px 0 20px', fontSize: '1.6rem' }}>To'plamlar</h1>

      

      <div className="grid" style={{ gap: 24 }}>
        {categories.map(cat => (
          <div
            key={cat.id}
            role="button"
            tabIndex={0}
            onClick={() => goToCategory(cat.id)}
            onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && goToCategory(cat.id)}
            className={`card product-card`}
            style={{
              padding: 12,
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: 160,
              textAlign: 'left'
            }}
          >
            <div>
              <h3 className="card-title" style={{ margin: '0 0 8px' }}>{cat.name}</h3>
              <p className="card-description" style={{ margin: 0, color: 'var(--text-secondary)' }}>{(products.filter(p => cat.id === 'all' ? true : p.category === cat.id)).length} ta mahsulot</p>
            </div>
            <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn primary" style={{ padding: '8px 12px' }} onClick={(e) => { e.stopPropagation(); goToCategory(cat.id); }}>Ko'rish</button>
            </div>
          </div>
        ))}
      </div>

    </div>
  )
}
