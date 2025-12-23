import React from 'react'

export default function Spinner({ size = 40, color = '#10b981' }) {
    return (
        <div className="spinner-container" style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '40px 0'
        }}>
            <div
                className="spinner"
                style={{
                    width: size,
                    height: size,
                    border: `4px solid ${color}20`,
                    borderTop: `4px solid ${color}`,
                    borderRadius: '50%',
                    animation: 'spin 0.8s linear infinite'
                }}
            />
        </div>
    )
}
