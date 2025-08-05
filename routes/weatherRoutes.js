const express = require('express');
const router = express.Router();
const { getWeather } = require('../controllers/weatherController');

// Тек '/' болу керек
router.get('/', getWeather);

module.exports = router;
