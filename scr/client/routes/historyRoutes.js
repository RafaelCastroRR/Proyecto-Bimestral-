const express = require('express');
const { getHistory } = require('../controllers/historyController');
const { authMiddleware } = require('../../middlewares/authMiddleware'); // ✅ Corrección aquí

const router = express.Router();

router.use(authMiddleware());
router.get('/', getHistory);

module.exports = router;
