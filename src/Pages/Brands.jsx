import React, { useState, useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import logo from '../assets/images/VitaBalansLogo.jpg'
import Loader from '../Components/Loader'

function Brands() {
  const brands = [
    { id: 'b1', name: 'VitaBalans' },
    { id: 'b2', name: 'NaturePlus' },
    { id: 'b3', name: 'HerbaCare' },
    { id: 'b4', name: 'WellnessCo' },
    { id: 'b5', name: 'PureLabs' },
    { id: 'b6', name: 'GreenLeaf' }
  ]

  const brandColors = ['#10b981', '#f97316', '#06b6d4', '#7c3aed', '#f59e0b', '#ef4444']

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700)
    return () => clearTimeout(t)
  }, [])

  return (
    <div className="container" style={{ padding: '40px 24px' }}>
      <h2>Brendlar</h2>
      <p style={{ color: '#64748b', maxWidth: 720 }}>
        Homilikk (hamkorlik) qilishni xohlovchi brendlar uchun sahifa. Quyida hamkor brendlarimiz.
      </p>

      {loading && <Loader />}

      <div style={{ marginTop: 24, maxWidth: 1000 }}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          slidesPerView={4}
          loop={true}
          autoplay={{ delay: 1, disableOnInteraction: false, pauseOnMouseEnter: false, waitForTransition: false }}
          speed={5000}
          allowTouchMove={false}
          onInit={(swiper) => {
            // enforce linear transition for continuous feel
            const wrapper = swiper.el.querySelector('.swiper-wrapper')
            if (wrapper) wrapper.style.transitionTimingFunction = 'linear'
          }}
          breakpoints={{
            0: { slidesPerView: 1 },
            480: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 }
          }}
        >
          {brands.map((b, idx) => (
            <SwiperSlide key={b.id}>
              <div className="brand-slide" style={{ padding: 12, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <div style={{ width: 160, textAlign: 'center', background: '#e2e8f0', padding: 12, borderRadius: 10, border: '1px solid rgba(15,23,42,0.06)', boxShadow: '0 6px 18px rgba(2,6,23,0.04)' }}>
                  <img src={logo} alt={b.name} style={{ width: '100%', height: 80, objectFit: 'contain', borderRadius: 8, backgroundColor: brandColors[idx % brandColors.length] }} />
                  <div style={{ marginTop: 8, color: '#0f172a', fontWeight: 600 }}>{b.name}</div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div style={{ marginTop: 28, maxWidth: 920 }}>
        <style>{`
          .brand-slide img{transition: transform .35s ease, box-shadow .35s ease}
          .brand-slide:hover img{transform: scale(1.06); box-shadow: 0 10px 30px rgba(2,6,23,0.12)}
          .cta-card{background: linear-gradient(90deg,#eef2ff,#f8fafc);padding:20px;border-radius:12px;box-shadow:0 8px 30px rgba(2,6,23,0.05);display:flex;align-items:center;justify-content:space-between}
          .btn.primary{background:#0ea5a4;color:#fff;border:none;padding:10px 18px;border-radius:8px}
          .btn.secondary{background:transparent;border:1px solid rgba(15,23,42,0.08);color:#0f172a;padding:10px 18px;border-radius:8px}
          @media (max-width:768px){.cta-card{flex-direction:column;align-items:flex-start;gap:12px}}
        `}</style>
        <div className="cta-card">
          <div>
            <h3 style={{ margin: 0, fontSize: 20, color: '#0f172a' }}>Biz hamkorlik qilamizmi?</h3>
            <p style={{ margin: '6px 0 0', color: '#475569' }}>Siz bilan birgalikda ishlashni xohlaymiz — taklif yoki savollaringiz bo'lsa, bizga murojaat qiling.</p>
          </div>
          <div style={{ display: 'flex', gap: 12 }}>
            <button className="btn primary">Hamkor bo'lish</button>
            <button className="btn secondary">Batafsil</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Brands
