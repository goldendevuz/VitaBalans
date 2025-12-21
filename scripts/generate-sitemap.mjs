import fs from 'fs'
import path from 'path'
import products from '../src/data/products.js'

const BASE = process.env.SITE_URL || 'https://vitabalans.uz'

const staticRoutes = [
  '/',
  '/catalog',
  '/about',
  '/brands',
  '/cart',
  '/checkout',
  '/login',
  '/register',
  '/profile'
]

const productRoutes = products.map(p => `/product/${p.id}`)

const urls = [...staticRoutes, ...productRoutes]

const items = urls.map(u => `  <url>\n    <loc>${BASE}${u}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.7</priority>\n  </url>`).join('\n')

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${items}\n</urlset>`

const outDir = path.join(process.cwd(), 'public')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })
fs.writeFileSync(path.join(outDir, 'sitemap.xml'), xml, 'utf8')
console.log('Sitemap generated at public/sitemap.xml')
