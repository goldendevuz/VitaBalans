import React, { useEffect, useState } from 'react'

export default function Promokodlar() {
  const [coupons, setCoupons] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    async function loadCoupons() {
      try {
        const res = await fetch(
          'https://api.vita-balans.uz/api/coupons',
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
            },
          }
        )

        if (!res.ok) {
          throw new Error(`Server xato: ${res.status}`)
        }

        const data = await res.json()

        if (!active) return

        // API array qaytarmasa — bo‘sh qilib qo‘yamiz
        const list = Array.isArray(data) ? data : []

        // amount / amout ni normalize qilamiz
        const normalized = list.map(item => ({
          id: item.id,
          name: item.name || 'Nomaʼlum kupon',
          description: item.description || '',
          amount: Number(item.amount ?? item.amout ?? 0),
        }))

        setCoupons(normalized)
        setError(null)
      } catch (err) {
        if (!active) return
        setError(err)
        setCoupons([])
      } finally {
        active && setLoading(false)
      }
    }

    loadCoupons()

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="container mx-auto p-4">
      <nav className="mb-4 text-sm">
        <a href="/" className="text-blue-600">Bosh sahifa</a> » Promokodlar
      </nav>

      <h1 className="text-2xl font-semibold mb-4">Promokodlar</h1>

      {loading && (
        <div className="card p-4">Yuklanmoqda...</div>
      )}

      {!loading && error && (
        <div className="card p-4 text-red-600">
          Xatolik: {error.message}
        </div>
      )}

      {!loading && !error && coupons.length === 0 && (
        <div className="card p-4">Kupon topilmadi</div>
      )}

      {!loading && !error && coupons.length > 0 && (
        <div className="flex flex-wrap gap-4">
          {coupons.map(coupon => (
            <div
              key={coupon.id}
              className="card p-4 w-[220px] flex flex-col justify-between"
            >
              <div>
                <strong className="block mb-2">
                  {coupon.name}
                </strong>

                <p className="text-sm text-gray-600 mb-2">
                  {coupon.description}
                </p>

                <div className="font-medium">
                  {((coupon.amount < 1000 ? coupon.amount * 1000 : coupon.amount).toLocaleString())} so‘m
                </div>
              </div>

              <button
                className="btn mt-3"
                onClick={() =>
                  navigator.clipboard?.writeText(coupon.name)
                }
              >
                Nusxa olish
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
