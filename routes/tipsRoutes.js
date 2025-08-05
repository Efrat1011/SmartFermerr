const express = require('express')
const router = express.Router()
const { getTips, addTip } = require('../controllers/tipsController')

router.get('/', getTips)
router.post('/', addTip)

module.exports = router
