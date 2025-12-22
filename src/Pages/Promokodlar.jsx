import React, { useState, useEffect } from 'react'

export default function Promokodlar() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    fetch('https://api.vita-balans.uz/coupons')
      .then(res => res.json())
      .then(data => {
        if (!mounted) return
        setCoupons(Array.isArray(data) ? data : [])
      })
      .catch(err => {
        if (!mounted) return
        setError(err)
        setCoupons([])
      })
      .finally(() => mounted && setLoading(false))

    return () => { mounted = false }
  }, [])

  return (
    <div className="container">
      <nav style={{ margin: '18px 0', fontSize: '0.95rem', color: 'var(--primary-600)' }}>
        <a href="/">Bosh sahifa</a> » <span style={{ marginLeft: 6 }}>Promokodlar</span>
      </nav>

      <h1 style={{ margin: '8px 0 20px', fontSize: '1.6rem' }}>Promokodlar</h1>

      {loading ? (
        <div className="card" style={{ padding: 12 }}>Yuklanmoqda...</div>
      ) : error ? (
        <div className="card" style={{ padding: 12 }}>Xatolik yuz berdi</div>
      ) : coupons.length === 0 ? (
        <div className="card" style={{ padding: 12 }}>Kupon topilmadi</div>
      ) : (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {coupons.map(c => (
            <div key={c.id} className="card product-card" style={{ padding: 12, minWidth: 220 }}>
              <div>
                <strong style={{ display: 'block', marginBottom: 6 }}>{c.name}</strong>
                <div style={{ color: 'var(--text-secondary)', marginBottom: 8, whiteSpace: 'pre-line' }}>{c.description}</div>
                <div style={{ fontSize: '0.95rem' }}>{c.type === 'percent' ? `${c.amount}% chegirma` : `${c.amount} so'm`}</div>
              </div>
              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  className="btn"
                  onClick={() => navigator.clipboard && navigator.clipboard.writeText(c.name)}
                >
                  Nusxa
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
