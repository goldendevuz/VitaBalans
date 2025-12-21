import express from 'express'
import path from 'path'
import fs from 'fs'

const app = express()
const PORT = process.env.PORT || 3000

const distPath = path.join(process.cwd(), 'dist')
const publicPath = path.join(process.cwd(), 'public')

// Serve static public files (robots.txt, sitemap.xml, etc.)
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath, { maxAge: '1d' }))
}

// Serve built SPA
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath, { maxAge: '1d' }))

  // Fallback to index.html for SPA routing
  app.get('*', (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'))
  })
} else {
  app.get('*', (req, res) => res.send('App not built. Run `npm run build`'))
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
