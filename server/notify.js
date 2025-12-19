const express = require('express')
const fetch = require('node-fetch')
require('dotenv').config()

const app = express()
app.use(express.json())

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

if(!BOT_TOKEN || !CHAT_ID){
  console.warn('Warning: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID not set in .env')
}

app.post('/notify', async (req, res) => {
  const payload = req.body || {}
  const {
    orderId, customer = {}, items = [], total, cardLast4, when
  } = payload

  const lines = []
  lines.push(`New order: #${orderId}`)
  if(when) lines.push(`When: ${new Date(when).toLocaleString()}`)
  lines.push('')
  lines.push(`Customer: ${customer.firstName || ''} ${customer.lastName || ''}`)
  if(customer.phone) lines.push(`Phone: ${customer.phone}`)
  if(customer.address) lines.push(`Address: ${customer.address}`)
  lines.push('')
  lines.push('Items:')
  items.forEach(it => {
    lines.push(`- ${it.title} x${it.qty}  (${( (it.price||0) * (it.qty||1) ).toFixed(0)} UZS)`)
  })
  lines.push('')
  lines.push(`Total: ${total} UZS`)
  if(cardLast4) lines.push(`Card (last4): **** **** **** ${cardLast4}`)

  const text = lines.join('\n')

  if(!BOT_TOKEN || !CHAT_ID){
    console.log('Notify payload:\n', text)
    return res.status(200).json({ ok: true, debug: true })
  }

  try{
    const tg = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`
    const r = await fetch(tg, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text, parse_mode: 'HTML' })
    })
    const data = await r.json()
    return res.status(200).json({ ok: true, telegram: data })
  } catch(err){
    console.error('Telegram send error', err)
    return res.status(500).json({ ok: false, error: String(err) })
  }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, ()=> console.log(`Notify server running on http://localhost:${PORT}`))
