const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/env');

// Тіркелу
const register = async (req, res) => {
  const { name, login, password } = req.body;
  if (!name || !login || !password) {
    return res.status(400).json({ message: 'Барлық өрістерді толтырыңыз' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users(name, login, password) VALUES($1, $2, $3) RETURNING *',
      [name, login, hashedPassword]
    );
    res.status(201).json({ message: 'Қолданушы тіркелді', user: result.rows[0] });
  } catch (error) {
    res.status(500).json({ message: 'Қате тіркелу кезінде', error });
  }
};

// Кіру
const login = async (req, res) => {
  const { login, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE login = $1', [login]);
    const user = result.rows[0];
    if (!user) {
      return res.status(401).json({ message: 'Қолданушы табылмады' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Құпиясөз қате' });
    }

    const token = jwt.sign({ id: user.id, login: user.login }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Қате кіру кезінде', error });
  }
};

// Профильді алу
const profile = async (req, res) => {
  const userId = req.user.id;

  try {
    const result = await pool.query('SELECT id, name, login FROM users WHERE id = $1', [userId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Қолданушы табылмады' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ message: 'Қате профильді алуда', error });
  }
};

module.exports = { register, login, profile };
