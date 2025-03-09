const Product = require('../models/productModel');

// Crear un nuevo producto
const createProduct = async (req, res) => {
  try {
    const { name, category, price, stock } = req.body;
    const newProduct = new Product({ name, category, price, stock });
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear el producto', error: err });
  }
};

// Obtener todos los productos
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener productos', error: err });
  }
};

// Obtener un producto específico
const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener el producto', error: err });
  }
};

// Actualizar un producto
const updateProduct = async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Error al actualizar el producto', error: err });
  }
};

// Eliminar un producto
const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.status(200).json({ message: 'Producto eliminado' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar el producto', error: err });
  }
};

module.exports = { createProduct, getProducts, getProductById, updateProduct, deleteProduct };
