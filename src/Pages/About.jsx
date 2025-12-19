import React from 'react'
import teamImg from '../assets/images/VitaBalansLogo.jpg'

function About() {
  return (
    <div className="container" style={{ padding: '60px 24px' }}>
      <section className="about-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 420px', gap: 32, alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: 6 }}>Biz haqimizda</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginTop: 6, lineHeight: 1.6 }}>
            VitaBalans — tabiiy vitaminlar va qo'shimchalar ishlab chiqaruvchi kompaniya. Biz sifat, ishonchlilik
            va shaffoflikni birinchi o'ringa qo'yamiz. Har bir mahsulotimiz mustaqil sinovlardan o'tgan
            ingredientlardan tayyorlanadi va sog'liqni qo'llab-quvvatlashga mo'ljallangan.
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap', alignItems: 'center' }}>
            <button className="btn primary" style={{ padding: '10px 16px', fontSize: '0.95rem' }}>Mahsulotlarni ko'rish</button>
            <a href="#contact" className="btn outline" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 14px', fontSize: '0.95rem' }}>Bog'lanish</a>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: 16, padding: 18, boxShadow: 'var(--shadow-card)' }}>
          <img src={teamImg} alt="Team" style={{ width: '100%', height: 260, objectFit: 'cover', borderRadius: 12 }} />
          <h3 style={{ marginTop: 12 }}>VitaBalans jamoasi</h3>
          <p style={{ color: 'var(--text-muted)', marginTop: 6 }}>Sog'liq, ilm va sifatga e'tibor qaratgan malakali mutaxassislar.</p>
        </div>
      </section>

      <section id="mission" style={{ marginTop: 48 }}>
        <div className="about-mission-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          <div style={{ background: 'white', padding: 20, borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}>
            <h4>Sifat</h4>
            <p style={{ color: 'var(--text-muted)' }}>Har bir partiya mustaqil sinovdan o'tadi.</p>
          </div>
          <div style={{ background: 'white', padding: 20, borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}>
            <h4>Shaffoflik</h4>
            <p style={{ color: 'var(--text-muted)' }}>Ingredientlar ro'yxati va manbalar ochiq.</p>
          </div>
          <div style={{ background: 'white', padding: 20, borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}>
            <h4>Doimiy qo'llab-quvvatlash</h4>
            <p style={{ color: 'var(--text-muted)' }}>Sizning sog'lig'ingizga yo'naltirilgan xizmat.</p>
          </div>
        </div>
      </section>

      <section id="contact" style={{ marginTop: 48, padding: 24, borderRadius: 12, background: 'linear-gradient(135deg,#ecfdf5,#f0fdfa)' }}>
        <h3>Hamkorlik va savollar</h3>
        <p style={{ color: 'var(--text-secondary)' }}>Biz bilan bog'lanish uchun quyidagi formani to'ldiring yoki telegram orqali yozing.</p>
        <form className="about-contact-form" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 12 }}>
          <input placeholder="Ismingiz" className="form-input" />
          <input placeholder="Telefon" className="form-input" />
          <input placeholder="Email (ixtiyoriy)" className="form-input" style={{ gridColumn: '1 / -1' }} />
          <textarea placeholder="Xabar" className="form-input" style={{ gridColumn: '1 / -1' }} />
          <button type="button" className="btn primary" style={{ gridColumn: '1 / -1' }}>Yuborish</button>
        </form>
      </section>

      <style>{`
        @media (max-width: 900px) {
          .about-hero-grid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 768px) {
          .about-mission-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 480px) {
          .about-mission-grid {
            grid-template-columns: 1fr !important;
          }
          .about-contact-form {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}

export default About

