const express = require('express');
const { makePurchase  } = require('../controllers/purchaseController');
const { authMiddleware } = require('../../middlewares/authMiddleware'); 

const router = express.Router();

router.use(authMiddleware);

router.post('/', makePurchase);


module.exports = router;
