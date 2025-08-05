const express = require('express');
const router = express.Router();
const { getProfile } = require('../controllers/profileControllers');

router.get('/', getProfile);

module.exports = router;
