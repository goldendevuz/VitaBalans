import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import blogs, { blogCategories } from '../data/blogs'
import { FaSearch, FaClock, FaTag } from 'react-icons/fa'

export default function Blog() {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredBlogs = useMemo(() => {
        let result = [...blogs]

        // Filter by search query
        if (searchQuery) {
            result = result.filter(b =>
                b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                b.subtitle.toLowerCase().includes(searchQuery.toLowerCase())
            )
        }

        // Filter by category
        if (selectedCategory !== 'all') {
            result = result.filter(b => b.category === selectedCategory)
        }

        return result
    }, [searchQuery, selectedCategory])

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        const day = date.getDate()
        const months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr']
        return `${day}-${months[date.getMonth()]}-${date.getFullYear()}`
    }

    return (
        <div>
            {/* Hero Banner */}
            <section style={{
                background: 'linear-gradient(135deg, #fef3c7 0%, #fef9c3 50%, #ffffff 100%)',
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
                    background: 'radial-gradient(circle, rgba(234, 179, 8, 0.1) 0%, transparent 70%)',
                    pointerEvents: 'none'
                }} />
                <div className="container" style={{ position: 'relative', zIndex: 1 }}>
                    <h1 style={{
                        fontSize: '2.8rem',
                        marginBottom: '16px',
                        background: 'linear-gradient(135deg, #0f172a 0%, #b45309 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                    }}>
                        Go'zal, mazali va sog'lom haqida blog
                    </h1>
                    <p style={{ fontSize: '1.2rem', color: '#475569', marginBottom: '32px', maxWidth: '600px' }}>
                        Vitaminlar, sog'liq va salomatlik haqida foydali maqolalar
                    </p>

                    {/* Search Input */}
                    <div style={{
                        display: 'flex',
                        gap: '16px',
                        maxWidth: '500px'
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
                                placeholder="Maqola qidirish..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    flex: 1,
                                    padding: '14px 14px 14px 50px',
                                    border: 'none',
                                    background: 'transparent',
                                    fontSize: '1rem',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Category Tabs */}
            <div className="container" style={{ padding: '24px 24px 0' }}>
                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginBottom: '24px'
                }}>
                    {blogCategories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{
                                padding: '10px 20px',
                                borderRadius: '25px',
                                border: 'none',
                                background: selectedCategory === cat.id
                                    ? 'linear-gradient(135deg, #f59e0b, #d97706)'
                                    : '#f1f5f9',
                                color: selectedCategory === cat.id ? 'white' : '#475569',
                                fontWeight: '600',
                                fontSize: '0.95rem',
                                cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blog Grid */}
            <div className="container" style={{ padding: '0 24px 80px' }}>
                <p style={{ color: '#64748b', marginBottom: '20px' }}>
                    <strong style={{ color: '#0f172a' }}>{filteredBlogs.length}</strong> ta maqola topildi
                </p>

                {filteredBlogs.length === 0 ? (
                    <div style={{
                        textAlign: 'center',
                        padding: '80px 20px',
                        background: 'white',
                        borderRadius: '20px',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}>
                        <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📝</div>
                        <h3 style={{ marginBottom: '12px' }}>Maqola topilmadi</h3>
                        <p style={{ color: '#64748b', marginBottom: '24px' }}>
                            Boshqa qidiruv so'zi yoki kategoriya tanlang
                        </p>
                        <button
                            className="btn primary"
                            onClick={() => { setSearchQuery(''); setSelectedCategory('all') }}
                        >
                            Barcha maqolalarni ko'rish
                        </button>
                    </div>
                ) : (
                    <div className="blog-grid">
                        {filteredBlogs.map(blog => (
                            <Link
                                key={blog.id}
                                to={`/blog/${blog.id}`}
                                style={{ textDecoration: 'none' }}
                            >
                                <div className="card blog-card" style={{
                                    overflow: 'hidden',
                                    borderRadius: '16px',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer',
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column'
                                }}>
                                    {/* Image */}
                                    <div className="card-image" style={{
                                        position: 'relative',
                                        paddingTop: '65%',
                                        overflow: 'hidden'
                                    }}>
                                        <img
                                            src={blog.image}
                                            alt={blog.title}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                transition: 'transform 0.3s ease'
                                            }}
                                            onError={(e) => {
                                                e.target.src = '/assets/images/VitaBalansLogo.jpg'
                                            }}
                                        />
                                        {/* Category Badge */}
                                        <div className="category-badge" style={{
                                            position: 'absolute',
                                            top: '10px',
                                            left: '10px',
                                            background: 'rgba(245, 158, 11, 0.9)',
                                            color: 'white',
                                            padding: '6px 12px',
                                            borderRadius: '20px',
                                            fontSize: '0.8rem',
                                            fontWeight: '600'
                                        }}>
                                            {blog.category}
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="card-content" style={{
                                        padding: '16px',
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}>
                                        <h3 className="card-title" style={{
                                            fontSize: '1rem',
                                            fontWeight: '700',
                                            color: '#0f172a',
                                            marginBottom: '6px',
                                            lineHeight: '1.3',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden'
                                        }}>
                                            {blog.title}
                                        </h3>
                                        <p className="card-subtitle" style={{
                                            fontSize: '0.85rem',
                                            color: '#64748b',
                                            marginBottom: '12px',
                                            lineHeight: '1.4',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 2,
                                            WebkitBoxOrient: 'vertical',
                                            overflow: 'hidden',
                                            flex: 1
                                        }}>
                                            {blog.subtitle}
                                        </p>
                                        <div className="card-date" style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '6px',
                                            color: '#94a3b8',
                                            fontSize: '0.8rem'
                                        }}>
                                            <FaClock />
                                            <span>{formatDate(blog.date)}</span>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>

            <style>{`
        .blog-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.12) !important;
        }
        .blog-card:hover img {
          transform: scale(1.05);
        }
        
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 28px;
        }
        
        @media (max-width: 768px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 12px !important;
          }
          .blog-card {
            border-radius: 12px !important;
          }
          .blog-card .card-image {
            padding-top: 55% !important;
          }
          .blog-card .card-content {
            padding: 10px !important;
          }
          .blog-card .card-title {
            font-size: 0.85rem !important;
            margin-bottom: 4px !important;
            -webkit-line-clamp: 2 !important;
          }
          .blog-card .card-subtitle {
            display: none !important;
          }
          .blog-card .card-date {
            font-size: 0.7rem !important;
          }
          .blog-card .category-badge {
            padding: 4px 8px !important;
            font-size: 0.65rem !important;
          }
        }
        
        @media (max-width: 400px) {
          .blog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 8px !important;
          }
        }
      `}</style>
        </div>
    )
}
