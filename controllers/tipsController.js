const pool = require('../config/db')

// Кеңестерді алу
const getTips = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tips ORDER BY id DESC')
    res.json(result.rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Кеңестерді жүктеу кезінде қате болды' })
  }
}

// Кеңес қосу
const addTip = async (req, res) => {
  const { title, content } = req.body
  if (!title || !content) {
    return res.status(400).json({ message: 'Title және content қажет' })
  }

  try {
    const result = await pool.query(
      'INSERT INTO tips (title, content) VALUES ($1, $2) RETURNING *',
      [title, content]
    )
    res.status(201).json(result.rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Кеңес қосу кезінде қате' })
  }
}

module.exports = { getTips, addTip }
