import React, { useState, useEffect } from 'react'

export default function Promokodlar() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true

    fetch('https://api.vita-balans.uz/api/coupons', {
      headers: {
        Accept: 'application/json',
      },
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(`API xato: ${res.status}`)
        }
        return res.json()
      })
      .then(data => {
        if (!mounted) return

        const arr = Array.isArray(data) ? data : []
        const normalized = arr.map(item => ({
          ...item,
          amount: Number(item.amount ?? item.amout ?? 0),
        }))

        setCoupons(normalized)
      })
      .catch(err => {
        if (!mounted) return
        setError(err)
        setCoupons([])
      })
      .finally(() => mounted && setLoading(false))

    return () => {
      mounted = false
    }
  }, [])

  return (
    <div className="container">
      <nav style={{ margin: '18px 0' }}>
        <a href="/">Bosh sahifa</a> » Promokodlar
      </nav>

      <h1>Promokodlar</h1>

      {loading ? (
        <div className="card">Yuklanmoqda...</div>
      ) : error ? (
        <div className="card">
          <b>Xatolik:</b> {error.message}
        </div>
      ) : coupons.length === 0 ? (
        <div className="card">Kupon topilmadi</div>
      ) : (
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {coupons.map(c => (
            <div key={c.id} className="card" style={{ minWidth: 220 }}>
              <strong>{c.name}</strong>
              <p>{c.description}</p>
              <div>{c.amount} so‘m</div>
              <button
                onClick={() =>
                  navigator.clipboard?.writeText(c.name)
                }
              >
                Nusxa
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
