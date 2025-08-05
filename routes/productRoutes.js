const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// Барлық өнімдер
router.get('/', productController.getAllProducts);

// Бір өнім
router.get('/:id', productController.getProductById);

// Қосу
router.post('/', productController.createProduct);

// Жаңарту
router.put('/:id', productController.updateProduct);

// Өшіру
router.delete('/:id', productController.deleteProduct);

module.exports = router;
