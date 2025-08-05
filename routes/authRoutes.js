const express = require('express');
const router = express.Router();
const { register, login, profile } = require('../controllers/authController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/profile', authenticateToken, profile); // қорғалған

module.exports = router;
