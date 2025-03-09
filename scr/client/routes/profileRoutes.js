const express = require('express');
const { getProfile, editProfile, deleteAccount } = require ('../controllers/profileController');
const { authMiddleware } = require('../../middlewares/authMiddleware'); // 💡 Corrección aquí
const router = express.Router();

router.use(authMiddleware()); // 💡 Asegúrate de llamarlo como función

router.get('/', getProfile);
router.put('/', editProfile);
router.delete('/', deleteAccount);

module.exports = router;
