const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [{ product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, quantity: Number }],
  total: { type: Number, required: true },
  date: { type: Date, default: Date.now }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;
