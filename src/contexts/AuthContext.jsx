import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem('vb_user')
    if (raw) setUser(JSON.parse(raw))
  }, [])

  const login = (userData) => {
    // Accept user object with name, email, phone
    const userInfo = typeof userData === 'string'
      ? { name: 'Foydalanuvchi', email: userData, phone: '', address: '' }
      : { ...userData, address: userData.address || '' }
    setUser(userInfo)
    localStorage.setItem('vb_user', JSON.stringify(userInfo))
  }

  const register = (payload) => {
    setUser(payload)
    localStorage.setItem('vb_user', JSON.stringify(payload))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('vb_user')
  }

  const updateUser = (updates) => {
    const updated = { ...user, ...updates }
    setUser(updated)
    localStorage.setItem('vb_user', JSON.stringify(updated))
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
