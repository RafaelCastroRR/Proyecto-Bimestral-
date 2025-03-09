const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    stock: { type: Number, required: true },
});

// Verifica si el modelo ya está registrado y, si no, lo registra
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = Product;
