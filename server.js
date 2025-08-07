// server.js
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { Pool } = require('pg')
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')
const tipsRoutes = require('./routes/tipsRoutes')
const weatherRoutes = require('./routes/weatherRoutes')
const profileRoutes = require('./routes/profileRoutes')
const geminiRoutes = require('./routes/geminiRoutes');

require('dotenv').config();


const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// PostgreSQL Pool (бір жерде ғана)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Vercel, Railway үшін қажет болуы мүмкін
  },
})

// Pool-ды req ішіне қосу (барлық маршруттарда қолжетімді болу үшін)
app.use((req, res, next) => {
  req.pool = pool
  next()
})

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/tips', tipsRoutes)
app.use('/api/weather', weatherRoutes)
app.use('/api/profile', profileRoutes)
app.use('/api/gemini', geminiRoutes);

// Тексеру үшін
app.get('/', (req, res) => {
  res.send('🚀 SmartFarmer сервері жұмыс істеп тұр!')
})


// Серверді іске қосу
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Сервер портта іске қосылды: ${PORT}`)
})
