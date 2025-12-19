import React, { useState, useContext, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { FaStar, FaShoppingCart, FaArrowLeft, FaHeart, FaShare } from 'react-icons/fa'
import products from '../data/products'
import { CartContext } from '../contexts/CartContext'
import { AuthContext } from '../contexts/AuthContext'
import ProductCard from '../Components/ProductCard'

function ProductDetail() {
    const { id } = useParams()
    const product = products.find(p => p.id === id)
    const [rating, setRating] = useState(5)
    const [reviewText, setReviewText] = useState('')
    const [reviews, setReviews] = useState([])
    const [showNotification, setShowNotification] = useState(false)
    const { add } = useContext(CartContext)
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(() => {
        try {
            const all = JSON.parse(localStorage.getItem('vb_reviews') || '{}')
            setReviews(all[id] || [])
        } catch (e) {
            setReviews([])
        }
    }, [id])

    if (!product) {
        return (
            <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
                <h2>Mahsulot topilmadi</h2>
                <Link to="/catalog" className="btn primary" style={{ marginTop: '20px' }}>
                    Katalogga qaytish
                </Link>
            </div>
        )
    }

    const handleAddToCart = () => {
        if (!user) {
            setShowNotification(true)
            setTimeout(() => setShowNotification(false), 3000)
            return
        }
        add(product)
        navigate('/cart')
    }

    const submitReview = () => {
        if (!reviewText.trim()) return
        const all = JSON.parse(localStorage.getItem('vb_reviews') || '{}')
        const list = all[id] || []
        const next = [{ rating, text: reviewText, at: Date.now(), user: user?.name || 'Mehmon' }, ...list]
        all[id] = next
        localStorage.setItem('vb_reviews', JSON.stringify(all))
        setReviews(next)
        setReviewText('')
    }

    const avgRating = reviews.length > 0
        ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
        : product.rating || 4.8

    const relatedProducts = products.filter(p => p.category === product.category && p.id !== id).slice(0, 4)

    return (
        <div className="container" style={{ padding: '40px 24px 80px' }}>
            {/* Notification */}
            {showNotification && (
                <div style={{
                    position: 'fixed',
                    top: '100px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                    color: 'white',
                    padding: '16px 32px',
                    borderRadius: '12px',
                    boxShadow: '0 10px 40px rgba(245, 158, 11, 0.3)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    animation: 'slideDown 0.3s ease'
                }}>
                    <span>⚠️ Xarid qilish uchun avval platformaga kiring!</span>
                    <Link to="/login" style={{
                        background: 'white',
                        color: '#d97706',
                        padding: '8px 16px',
                        borderRadius: '8px',
                        fontWeight: '600'
                    }}>
                        Kirish
                    </Link>
                </div>
            )}

            {/* Breadcrumb */}
            <nav style={{ marginBottom: '24px' }}>
                <Link to="/catalog" style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    color: '#64748b',
                    fontSize: '0.95rem'
                }}>
                    <FaArrowLeft /> Katalogga qaytish
                </Link>
            </nav>

            {/* Product Layout */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '60px',
                marginBottom: '60px'
            }}>
                {/* Image */}
                <div style={{
                    background: '#f8fafc',
                    borderRadius: '24px',
                    padding: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <img
                        src={product.image}
                        alt={product.title}
                        style={{
                            maxWidth: '100%',
                            maxHeight: '400px',
                            objectFit: 'contain'
                        }}
                    />
                </div>

                {/* Info */}
                <div>
                    <span style={{
                        display: 'inline-block',
                        background: 'linear-gradient(135deg, #ecfdf5, #f0fdfa)',
                        color: '#059669',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '500',
                        marginBottom: '16px'
                    }}>
                        {product.category}
                    </span>

                    <h1 style={{ fontSize: '2.2rem', marginBottom: '16px' }}>{product.title}</h1>

                    {/* Rating */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
                        <div style={{ display: 'flex', gap: '4px' }}>
                            {[1, 2, 3, 4, 5].map(s => (
                                <FaStar key={s} color={s <= Math.round(avgRating) ? '#f5b50a' : '#e2e8f0'} />
                            ))}
                        </div>
                        <span style={{ fontWeight: '600' }}>{avgRating}</span>
                        <span style={{ color: '#64748b' }}>({reviews.length} ta sharh)</span>
                    </div>

                    <p style={{ fontSize: '1.1rem', color: '#475569', lineHeight: 1.7, marginBottom: '24px' }}>
                        {product.description}
                    </p>

                    <div style={{
                        fontSize: '2.5rem',
                        fontWeight: '700',
                        color: '#10b981',
                        marginBottom: '32px'
                    }}>
                        ${product.price.toFixed(2)}
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', gap: '16px', marginBottom: '32px' }}>
                        <button
                            className="btn primary"
                            onClick={handleAddToCart}
                            style={{ flex: 1, padding: '16px 32px', fontSize: '1.1rem' }}
                        >
                            <FaShoppingCart style={{ marginRight: '10px' }} />
                            Savatga qo'shish
                        </button>
                        <button className="btn outline" style={{ padding: '16px' }}>
                            <FaHeart />
                        </button>
                        <button className="btn outline" style={{ padding: '16px' }}>
                            <FaShare />
                        </button>
                    </div>

                    {/* Features */}
                    <div style={{
                        background: '#f8fafc',
                        borderRadius: '16px',
                        padding: '20px',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: '16px'
                    }}>
                        {[
                            { label: '100% Tabiiy', icon: '🌿' },
                            { label: 'Tez yetkazish', icon: '🚚' },
                            { label: 'Sifat kafolati', icon: '✅' },
                            { label: 'Tekin qaytarish', icon: '↩️' }
                        ].map((f, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ fontSize: '1.2rem' }}>{f.icon}</span>
                                <span style={{ fontSize: '0.9rem', color: '#475569' }}>{f.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Reviews Section */}
            <div style={{
                background: 'white',
                borderRadius: '24px',
                padding: '40px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                marginBottom: '60px'
            }}>
                <h2 style={{ marginBottom: '32px' }}>Sharhlar</h2>

                {/* Add Review */}
                <div style={{
                    background: '#f8fafc',
                    borderRadius: '16px',
                    padding: '24px',
                    marginBottom: '32px'
                }}>
                    <h4 style={{ marginBottom: '16px' }}>Sharh qoldiring</h4>
                    <div style={{ display: 'flex', gap: '4px', marginBottom: '16px' }}>
                        {[1, 2, 3, 4, 5].map(s => (
                            <button
                                key={s}
                                onClick={() => setRating(s)}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '8px',
                                    border: '1px solid #e2e8f0',
                                    background: s <= rating ? '#fef3c7' : 'white',
                                    fontSize: '1.2rem',
                                    cursor: 'pointer'
                                }}
                            >
                                {s <= rating ? '★' : '☆'}
                            </button>
                        ))}
                    </div>
                    <textarea
                        value={reviewText}
                        onChange={e => setReviewText(e.target.value)}
                        placeholder="Fikringizni yozing..."
                        style={{
                            width: '100%',
                            minHeight: '100px',
                            padding: '16px',
                            borderRadius: '12px',
                            border: '1px solid #e2e8f0',
                            fontSize: '1rem',
                            marginBottom: '16px',
                            resize: 'vertical'
                        }}
                    />
                    <button className="btn primary" onClick={submitReview}>
                        Yuborish
                    </button>
                </div>

                {/* Reviews List */}
                {reviews.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        {reviews.map((r, i) => (
                            <div key={i} style={{
                                padding: '20px',
                                background: '#f8fafc',
                                borderRadius: '12px'
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <strong>{r.user || 'Foydalanuvchi'}</strong>
                                    <div style={{ display: 'flex', gap: '2px' }}>
                                        {[1, 2, 3, 4, 5].map(s => (
                                            <FaStar key={s} size={14} color={s <= r.rating ? '#f5b50a' : '#e2e8f0'} />
                                        ))}
                                    </div>
                                </div>
                                <p style={{ color: '#475569', margin: 0 }}>{r.text}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p style={{ color: '#64748b', textAlign: 'center' }}>Hali sharhlar yo'q. Birinchi bo'lib sharh qoldiring!</p>
                )}
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
                <div>
                    <h2 style={{ marginBottom: '32px' }}>O'xshash mahsulotlar</h2>
                    <div className="grid">
                        {relatedProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </div>
            )}

            <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateX(-50%) translateY(-20px); }
          to { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
        @media (max-width: 768px) {
          .container > div:first-of-type {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
        </div>
    )
}

export default ProductDetail
