import React, { useState, useMemo } from 'react'
import { useParams, Link } from 'react-router-dom'
import blogs from '../data/blogs'
import { FaArrowLeft, FaClock, FaTag, FaPlus, FaMinus, FaBookmark } from 'react-icons/fa'

export default function BlogDetail() {
    const { id } = useParams()
    const [expandedSections, setExpandedSections] = useState({})

    const blog = useMemo(() => {
        return blogs.find(b => b.id === id)
    }, [id])

    if (!blog) {
        return (
            <div className="container" style={{ padding: '80px 24px', textAlign: 'center' }}>
                <h1>Maqola topilmadi</h1>
                <Link to="/blog" className="btn primary" style={{ marginTop: '20px' }}>
                    Blogga qaytish
                </Link>
            </div>
        )
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr)
        const day = date.getDate()
        const months = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentyabr', 'oktyabr', 'noyabr', 'dekabr']
        const hours = date.getHours().toString().padStart(2, '0')
        const minutes = date.getMinutes().toString().padStart(2, '0')
        return `${hours}:${minutes}, ${day}-${months[date.getMonth()]}-${date.getFullYear()}`
    }

    const toggleSection = (section) => {
        setExpandedSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }))
    }

    const AccordionSection = ({ title, items, sectionKey }) => {
        if (!items || items.length === 0) return null
        const isExpanded = expandedSections[sectionKey]

        return (
            <div style={{
                border: '2px solid #e2e8f0',
                borderRadius: '12px',
                marginBottom: '12px',
                overflow: 'hidden'
            }}>
                <button
                    onClick={() => toggleSection(sectionKey)}
                    style={{
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px 20px',
                        background: 'white',
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '1rem',
                        fontWeight: '600',
                        color: '#0f172a',
                        textAlign: 'left'
                    }}
                >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        {isExpanded ? <FaMinus style={{ color: '#10b981' }} /> : <FaPlus style={{ color: '#10b981' }} />}
                        {title}
                    </span>
                </button>
                {isExpanded && (
                    <div style={{
                        padding: '0 20px 20px',
                        background: '#f8fafc'
                    }}>
                        <ul style={{
                            margin: 0,
                            paddingLeft: '20px',
                            color: '#475569',
                            lineHeight: '1.8'
                        }}>
                            {items.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        )
    }

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
            {/* Top Navigation */}
            <div className="container" style={{ padding: '20px 24px' }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Link
                        to="/blog"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            color: '#0f172a',
                            textDecoration: 'none',
                            fontWeight: '500'
                        }}
                    >
                        <FaArrowLeft />
                        Naverx
                    </Link>
                    <button
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            padding: '10px 20px',
                            background: '#0f172a',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontWeight: '500'
                        }}
                    >
                        <FaBookmark />
                        V izbrannye
                    </button>
                </div>
            </div>

            {/* Hero Image */}
            <div style={{
                width: '100%',
                maxHeight: '400px',
                overflow: 'hidden'
            }}>
                <img
                    src={blog.image}
                    alt={blog.title}
                    style={{
                        width: '100%',
                        height: '400px',
                        objectFit: 'cover'
                    }}
                    onError={(e) => {
                        e.target.src = '/assets/images/VitaBalansLogo.jpg'
                    }}
                />
            </div>

            {/* Content */}
            <div className="container" style={{ padding: '40px 24px 80px' }}>
                <div style={{
                    maxWidth: '800px',
                    margin: '0 auto',
                    background: 'white',
                    borderRadius: '20px',
                    padding: '40px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    marginTop: '-60px',
                    position: 'relative',
                    zIndex: 1
                }}>
                    {/* Title */}
                    <h1 style={{
                        fontSize: '1.8rem',
                        fontWeight: '700',
                        color: '#0f172a',
                        marginBottom: '12px',
                        lineHeight: '1.3'
                    }}>
                        {blog.title}
                    </h1>

                    {/* Subtitle */}
                    <h2 style={{
                        fontSize: '1.1rem',
                        fontWeight: '600',
                        color: '#475569',
                        marginBottom: '24px',
                        lineHeight: '1.4'
                    }}>
                        {blog.subtitle}
                    </h2>

                    {/* Category Tag */}
                    <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#fef3c7',
                        color: '#b45309',
                        padding: '6px 14px',
                        borderRadius: '20px',
                        fontSize: '0.85rem',
                        fontWeight: '600',
                        marginBottom: '32px'
                    }}>
                        <FaTag />
                        {blog.category}
                    </div>

                    {/* Main Content */}
                    <div style={{
                        color: '#374151',
                        fontSize: '1rem',
                        lineHeight: '1.8',
                        marginBottom: '40px'
                    }}>
                        {blog.content.split('\n\n').map((paragraph, index) => (
                            <p key={index} style={{ marginBottom: '20px' }}>
                                {paragraph}
                            </p>
                        ))}
                    </div>

                    {/* Accordion Sections */}
                    <div style={{ marginTop: '32px' }}>
                        <AccordionSection
                            title="Foydalanish bo'yicha tavsiyalar"
                            items={blog.recommendations}
                            sectionKey="recommendations"
                        />
                        <AccordionSection
                            title="Ingredientlar"
                            items={blog.ingredients}
                            sectionKey="ingredients"
                        />
                        <AccordionSection
                            title="Ogohlantirishlar"
                            items={blog.warnings}
                            sectionKey="warnings"
                        />
                    </div>

                    {/* Date */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: '#94a3b8',
                        fontSize: '0.9rem',
                        marginTop: '40px',
                        paddingTop: '20px',
                        borderTop: '1px solid #e2e8f0'
                    }}>
                        <FaClock />
                        <span>Qo'shilgan {formatDate(blog.date)}</span>
                    </div>
                </div>

                {/* Back Button */}
                <div style={{ textAlign: 'center', marginTop: '40px' }}>
                    <Link to="/blog" className="btn outline">
                        ← Barcha maqolalarga qaytish
                    </Link>
                </div>
            </div>
        </div>
    )
}
