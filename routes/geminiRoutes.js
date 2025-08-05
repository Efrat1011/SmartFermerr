const express = require('express');
const router = express.Router();
const { askGemini, getTips } = require('../controllers/geminiController');

router.post('/ask', askGemini);
router.get('/tips', getTips);  // ← осы жол бар екеніне көз жеткіз

module.exports = router;
