import React from 'react'

export default function Loader({ message = 'Yuklanmoqda...' }) {
  return (
    <div style={styles.overlay}>
      <div style={styles.card}>
        <div style={styles.spinner}>
          <span style={{ ...styles.arc, borderColor: '#22c55e transparent transparent transparent' }} />
          <span style={{ ...styles.arc, borderColor: '#f59e0b transparent transparent transparent', animationDelay: '-0.6s' }} />
        </div>

        <span style={styles.text}>{message}</span>

        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg) }
            100% { transform: rotate(360deg) }
          }
        `}</style>
      </div>
    </div>
  )
}

const styles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.55)',
    backdropFilter: 'blur(6px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  },
  card: {
    background: 'rgba(255,255,255,0.92)',
    padding: '24px 28px',
    borderRadius: 18,
    minWidth: 240,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 14,
    boxShadow: '0 25px 60px rgba(0,0,0,0.3)'
  },
  spinner: {
    position: 'relative',
    width: 56,
    height: 56
  },
  arc: {
    position: 'absolute',
    inset: 0,
    borderRadius: '50%',
    borderStyle: 'solid',
    borderWidth: 5,
    animation: 'spin 1.1s linear infinite'
  },
  text: {
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: '.3px',
    color: '#14532d'
  }
}
