// controllers/profileControllers.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');
const pool = require('../config/db'); // ← pool дұрыс осылай алынады

const getProfile = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Авторизация қажет' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const userId = decoded.id;

    const result = await pool.query(
      'SELECT id, name, login, email FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Қолданушы табылмады' });
    }

    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error('Қате (profileControllers):', err);
    res.status(403).json({ message: 'Токен дұрыс емес немесе ескірген' });
  }
};

module.exports = {
  getProfile,
};
