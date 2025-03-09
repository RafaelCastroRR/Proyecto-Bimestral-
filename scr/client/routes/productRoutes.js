const express = require('express');
const { getAllProducts, searchProductsByName, getProductsByCategory } = require('../controllers/productController');
const router = express.Router();

router.get('/', getAllProducts);
router.get('/search/:query', searchProductsByName);
router.get('/category/:category', getProductsByCategory);

module.exports = router;
