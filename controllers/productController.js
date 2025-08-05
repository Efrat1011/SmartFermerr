const pool = require('../config/db');

// Барлық өнімдерді алу
exports.getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Өнімдерді алу қатесі' });
  }
};

// Бір өнімді алу
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    result.rows.length
      ? res.json(result.rows[0])
      : res.status(404).json({ message: 'Өнім табылмады' });
  } catch (err) {
    res.status(500).json({ message: 'Қате' });
  }
};

// Жаңа өнім қосу
exports.createProduct = async (req, res) => {
  const { name, price, description } = req.body;
  if (!name || !price) {
    return res.status(400).json({ message: 'Атауы мен бағасы міндетті' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO products (name, price, description) VALUES ($1, $2, $3) RETURNING *',
      [name, price, description || '']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Қосу қатесі' });
  }
};

// Өнімді жаңарту
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  try {
    const result = await pool.query(
      'UPDATE products SET name=$1, price=$2, description=$3 WHERE id=$4 RETURNING *',
      [name, price, description, id]
    );
    result.rows.length
      ? res.json(result.rows[0])
      : res.status(404).json({ message: 'Өнім табылмады' });
  } catch (err) {
    res.status(500).json({ message: 'Жаңарту қатесі' });
  }
};

// Өнімді өшіру
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM products WHERE id=$1 RETURNING *', [id]);
    result.rows.length
      ? res.json({ message: 'Өнім өшірілді' })
      : res.status(404).json({ message: 'Өнім табылмады' });
  } catch (err) {
    res.status(500).json({ message: 'Өшіру қатесі' });
  }
};
