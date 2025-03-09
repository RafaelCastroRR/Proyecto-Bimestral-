const Product = require('../models/productModel'); // Asegúrate de que el modelo está importado correctamente

// Obtener todos los productos
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos", error });
    }
};

// Buscar productos por nombre
const searchProductsByName = async (req, res) => {
    const { query } = req.params;
    try {
        const products = await Product.find({ name: { $regex: query, $options: 'i' } });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al buscar productos", error });
    }
};

// Obtener productos por categoría
const getProductsByCategory = async (req, res) => {
    const { category } = req.params;
    try {
        const products = await Product.find({ category });
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener productos por categoría", error });
    }
};

module.exports = { getAllProducts, searchProductsByName, getProductsByCategory };
