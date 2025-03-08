const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController');

router.post('/', invoiceController.createInvoice);
router.get('/:userId', invoiceController.getInvoicesByUser);

module.exports = router;

