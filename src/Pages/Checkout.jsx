import React, { useContext, useEffect, useState } from 'react'
import { CartContext } from '../contexts/CartContext'
import { AuthContext } from '../contexts/AuthContext'

function Checkout() {
  const { items, clear } = useContext(CartContext)
  const { user } = useContext(AuthContext)

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [coords, setCoords] = useState(null)

  const [cardNumber, setCardNumber] = useState('')
  const [cardExp, setCardExp] = useState('')
  const [cardCvc, setCardCvc] = useState('')
  const [loading, setLoading] = useState(false)
  const [placedOrder, setPlacedOrder] = useState(null)

  useEffect(() => {
    if (user) {
      const parts = (user.name || '').trim().split(/\s+/)
      setFirstName(parts[0] || '')
      setLastName(parts.slice(1).join(' ') || '')
      setPhone(user.phone || '')
      setAddress(user.address || '')
    }
  }, [user])

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => setCoords({ lat: p.coords.latitude, lng: p.coords.longitude }),
        () => {}
      )
    }
  }, [])

  const subtotal = items.reduce((s, it) => s + (it.price || 0) * (it.qty || 1), 0)

  const maskCard = (num) => {
    const n = (num || '').replace(/\s+/g, '')
    return n.length >= 4 ? '**** **** **** ' + n.slice(-4) : '**** **** **** ****'
  }

  const luhnCheck = (num) => {
    let sum = 0
    let alt = false
    for (let i = num.length - 1; i >= 0; i--) {
      let n = parseInt(num[i], 10)
      if (alt) {
        n *= 2
        if (n > 9) n -= 9
      }
      sum += n
      alt = !alt
    }
    return sum % 10 === 0
  }

  const validateCard = () => {
    const num = cardNumber.replace(/\s+/g, '')
    if (!/^\d{12,19}$/.test(num)) return 'Karta raqami noto\'g\'ri'
    if (!luhnCheck(num)) return 'Karta raqami noto\'g\'ri (Luhn tekshiruvi)'
    if (!/^\d{2}\/\d{2}$/.test(cardExp)) return 'Yaroqlilik MM/YY formatda bo\'lishi kerak'
    const [mStr, yStr] = cardExp.split('/')
    const month = parseInt(mStr, 10)
    const year = parseInt(yStr, 10)
    if (isNaN(month) || month < 1 || month > 12) return 'Oy noto\'g\'ri'
    const fullYear = 2000 + year
    const now = new Date()
    const exp = new Date(fullYear, month, 0, 23, 59, 59)
    if (exp < now) return 'Karta muddati o\'tgan'
    if (!/^\d{3,4}$/.test(cardCvc)) return 'CVC noto\'g\'ri'
    return null
  }

  const reverseGeocode = async (lat, lng) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`
      )
      if (!res.ok) return
      const data = await res.json()
      if (data && data.display_name) setAddress(data.display_name)
      else setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`)
    } catch (e) {
      setAddress(`${lat.toFixed(6)}, ${lng.toFixed(6)}`)
    }
  }

  const handleUseLocation = () => {
    if (coords) {
      reverseGeocode(coords.lat, coords.lng)
      return
    }
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (p) => {
          const c = { lat: p.coords.latitude, lng: p.coords.longitude }
          setCoords(c)
          reverseGeocode(c.lat, c.lng)
        },
        () => alert('Joylashuv olinmadi')
      )
    } else {
      alert("Brauzeringiz geolokatsiyani qo'llab-quvvatlamaydi")
    }
  }

  const handlePlace = async () => {
    if (items.length === 0) {
      alert("Savatcha bo'sh")
      return
    }
    if (!firstName) {
      alert("Ismni kiriting")
      return
    }
    const err = validateCard()
    if (err) {
      alert(err)
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 900))
    setLoading(false)

    const orders = JSON.parse(localStorage.getItem('vb_orders') || '[]')
    const order = {
      id: Date.now(),
      items,
      customer: { firstName, lastName, phone, address },
      total: subtotal,
      payment: { method: 'card', card: maskCard(cardNumber) },
      when: Date.now(),
    }
    orders.unshift(order)
    localStorage.setItem('vb_orders', JSON.stringify(orders))

    try {
      fetch('http://localhost:3001/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          orderId: order.id,
          when: order.when,
          customer: order.customer,
          items: order.items,
          total: order.total,
          cardLast4: order.payment.card.slice(-4),
        }),
      }).catch((e) => console.warn('notify failed', e))
    } catch (e) {
      console.warn('notify error', e)
    }

    clear()
    setPlacedOrder(order)
    // keep user on checkout and show confirmation instead of redirecting
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="container" style={{ padding: '24px' }}>
      <h2 style={{ marginBottom: 16 }}>Checkout</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: 24, alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 6px 18px rgba(15,23,42,0.06)' }}>
            <h3 style={{ margin: '0 0 12px' }}>Sizning savatingiz</h3>
            {items.length === 0 ? (
              <div className="muted">Savatcha bo'sh</div>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {items.map((it) => (
                  <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <img src={it.image || ''} alt={it.title} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{it.title}</div>
                        <div style={{ color: '#64748b', fontSize: 13 }}>x{it.qty}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 700 }}>{((it.price || 0) * (it.qty || 1)).toFixed(0)} UZS</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 6px 18px rgba(15,23,42,0.06)' }}>
            <h3 style={{ marginTop: 0 }}>Shipping information</h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <div>
                <label>Ism</label>
                <input className="form-input" readOnly value={firstName} onChange={(e) => setFirstName(e.target.value)} />
              </div>
              <div>
                <label>Familiya</label>
                <input className="form-input" readOnly value={lastName} onChange={(e) => setLastName(e.target.value)} />
              </div>
            </div>

            <div style={{ marginTop: 12 }}>
              <label>Telefon</label>
              <input className="form-input" readOnly value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>

            <div style={{ marginTop: 12 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <label style={{ margin: 0 }}>Manzil</label>
                <button type="button" className="btn outline" onClick={handleUseLocation} style={{ padding: '8px 12px', fontSize: 13 }}>Joriy manzilni ishlat</button>
              </div>
              <textarea className="form-input" value={address} onChange={(e) => setAddress(e.target.value)} />

              <div style={{ marginTop: 12, borderRadius: 8, overflow: 'hidden', border: '1px solid var(--border)' }}>
                {coords ? (
                  <iframe title="map" src={`https://maps.google.com?q=${coords.lat},${coords.lng}&output=embed`} style={{ width: '100%', height: 220, border: 0 }} />
                ) : (
                  <div style={{ padding: 12, color: 'var(--text-muted)' }}>
                    Xaritani ko'rish uchun
                    <button type="button" className="btn outline" onClick={handleUseLocation} style={{ marginLeft: 8 }}>Joriy manzilni olish</button>
                  </div>
                )}
              </div>
            </div>

            <h3 style={{ marginTop: 18 }}>To'lov: Kart bilan</h3>
            <div style={{ marginTop: 8, color: '#475569', fontSize: 14 }}>Naqd to'lov qo'llab-quvvatlanmaydi — karta ma'lumotlarini kiriting.</div>

            <div style={{ marginTop: 12, display: 'grid', gap: 8 }}>
              <label>Karta raqami</label>
              <input className="form-input" placeholder="1234 1234 1234 1234" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ flex: 1 }}>
                  <label>MM/YY</label>
                  <input className="form-input" placeholder="02/28" value={cardExp} onChange={(e) => setCardExp(e.target.value)} />
                </div>
                <div style={{ width: 120 }}>
                  <label>CVC</label>
                  <input className="form-input" placeholder="123" value={cardCvc} onChange={(e) => setCardCvc(e.target.value)} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
              <button className="btn primary" onClick={handlePlace} disabled={loading}>{loading ? 'Processing...' : "Kart bilan to'lash va buyurtma"}</button>
            </div>
          </div>
        </div>

        <aside style={{ position: 'sticky', top: 20 }}>
          <div style={{ background: 'white', borderRadius: 12, padding: 16, boxShadow: '0 6px 18px rgba(15,23,42,0.06)' }}>
            <h4 style={{ margin: '0 0 12px' }}>Your order</h4>
            {items.length === 0 ? (
              <div className="muted">Savatcha bo'sh</div>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {items.map((it) => (
                  <div key={it.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                      <img src={it.image || ''} alt={it.title} style={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 8 }} />
                      <div>
                        <div style={{ fontWeight: 600 }}>{it.title}</div>
                        <div style={{ color: '#64748b', fontSize: 13 }}>x{it.qty}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 700 }}>{((it.price || 0) * (it.qty || 1)).toFixed(0)} UZS</div>
                  </div>
                ))}

                <div style={{ borderTop: '1px solid #eef2f7', paddingTop: 12, display: 'flex', justifyContent: 'space-between', fontWeight: 700 }}>
                  <div>Subtotal</div>
                  <div>{subtotal.toFixed(0)} UZS</div>
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: 12, textAlign: 'center', color: '#64748b', fontSize: 13 }}>
            {coords ? <div>Joylashuvingiz aniqlangan</div> : <div>Manzil avtomatik aniqlanmayapti</div>}
          </div>
        </aside>
      </div>
    </div>
  )
}

export default Checkout
