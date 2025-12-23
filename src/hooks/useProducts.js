import { useState, useEffect, useCallback } from 'react'
import { apiFetch, API_BASE } from '../lib/api'
import localProducts, { categories as localCategories } from '../data/products'

// Hook to load products from backend API with robust fallbacks.
export default function useProducts({ page = 1, limit = 20 } = {}) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([{ id: 'all', name: 'Barcha mahsulotlar' }])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [lastUrl, setLastUrl] = useState(null)

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    setError(null)
    // Required parameters for the Railway backend
    const defaultBrand = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    const defaultCategory = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    const defaultCollection = '3fa85f64-5717-4562-b3fc-2c963f66afa6'
    const relativePath = `/products?page=${page}&limit=${limit}&brands=${defaultBrand}&categories=${defaultCategory}&collections=${defaultCollection}&sort=old_to_new`
    try {
      setLastUrl(`${API_BASE}${relativePath}`)
      const res = await apiFetch(relativePath)

      const data = await res.json()


      let items = []
      if (Array.isArray(data)) {
        items = data
      } else if (data && typeof data === 'object') {
        // Check standard pagination wrappers
        if (Array.isArray(data.items)) items = data.items
        else if (Array.isArray(data.products)) items = data.products
        else if (Array.isArray(data.data)) items = data.data
        // Check for nested api response structure { ok: true, data: { items: [] } }
        else if (data.data && Array.isArray(data.data.items)) items = data.data.items
        // Fallback for other potential structures
        else if (Array.isArray(data.result)) items = data.result
      }

      // normalize to array
      const list = Array.isArray(items) ? items : []

      // Map API items to the app's expected product shape
      const mapped = list.map(item => ({
        id: (item.id || item._id || item.slug || item.code || String(item.product_id) || Math.random().toString(36).slice(2)),
        title: item.title || item.name || item.product_name || item.name_uz || 'No title',
        description: item.description || item.desc || item.short_description || item.product_description || '',
        // Use final_price as the current price, base_price as old price (for discount display)
        price: Number(item.final_price ?? item.price ?? item.current_price ?? 0),
        oldPrice: Number(item.base_price ?? item.oldPrice ?? item.list_price ?? 0) || null,
        discountPercent: Number(item.discount_percent ?? 0),
        available: item.in_stock !== undefined ? Boolean(item.in_stock) : (item.available !== undefined ? Boolean(item.available) : true),
        image: item.image_url || item.image || (item.images && item.images[0]) || item.thumbnail || '/assets/images/VitaBalansLogo.jpg',
        category: item.category || item.categoryName || item.cat || item.type || null,
        rating: Number(item.rating ?? item.stars ?? 4.8)
      }))

      setProducts(mapped)

      const catIds = Array.from(new Set(mapped.map(i => i.category).filter(Boolean)))
      const cats = [{ id: 'all', name: 'Barcha mahsulotlar' }, ...catIds.map(id => ({ id, name: id }))]
      setCategories(cats)
      setLoading(false)
    } catch (e) {
      console.error('useProducts error, using local fallback:', e)
      // Fallback to local products when API fails
      setProducts(localProducts)
      setCategories(localCategories)
      setError(null) // Don't show error since we have fallback data
      setLoading(false)
    }
  }, [page, limit])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, categories, loading, error, lastUrl, refetch: fetchProducts }
}

