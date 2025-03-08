// src/auth/routes/authRoutes.js

const express = require('express');
const { registerUser, loginUser, verifyToken ,getUsers} = require('../controllers/authController');

const router = express.Router();

// Ruta para registrar un nuevo usuario
router.post('/register', registerUser);

// Ruta para iniciar sesión
router.post('/login', loginUser);

// Ruta protegida (requiere autenticación)
router.get('/profile', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Acceso a perfil autorizado', user: req.user });
});

router.get('/list', getUsers);

module.exports = router; // Cambiado para usar module.exports
