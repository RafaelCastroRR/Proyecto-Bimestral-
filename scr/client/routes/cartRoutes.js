const express = require('express');
const { createCart, addToCart, getCart } = require('../controllers/cartController');
const router = express.Router();

// Ruta para crear un carrito vacío
router.post('/create', createCart);

// Ruta para agregar productos al carrito
router.post('/add', addToCart); // Aquí no necesitamos el middleware de auth

// Ruta para obtener el carrito de un usuario
router.get('/', getCart);  // Aquí no necesitamos el middleware de auth

module.exports = router;
