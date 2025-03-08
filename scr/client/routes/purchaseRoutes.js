const express = require('express');
const { makePurchase, getPurchaseHistory } = require('../controllers/purchaseController');
const { authMiddleware } = require('../../middlewares/authMiddleware'); // ✅ Corrección aquí

const router = express.Router();

router.use(authMiddleware);

router.post('/', makePurchase);
router.get('/history', getPurchaseHistory);

module.exports = router;
