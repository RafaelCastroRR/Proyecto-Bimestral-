// controllers/categoryController.js
const Category = require('../models/categoryModel');
const Product = require('../models/productModel');

// Crear una categoría
const createCategory = async (req, res) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'No tienes permisos para realizar esta acción.' });
    }

    const { name, description } = req.body;
    try {
        const newCategory = new Category({ name, description });
        await newCategory.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la categoría', error });
    }
};

// Obtener todas las categorías
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener categorías', error });
    }
};

// Editar una categoría
const updateCategory = async (req, res) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'No tienes permisos para realizar esta acción.' });
    }

    const { id } = req.params;
    const { name, description } = req.body;

    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        category.name = name || category.name;
        category.description = description || category.description;

        await category.save();
        res.status(200).json(category);
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar la categoría', error });
    }
};

// Eliminar una categoría
const deleteCategory = async (req, res) => {
    if (req.user.role !== 'ADMIN') {
        return res.status(403).json({ message: 'No tienes permisos para realizar esta acción.' });
    }

    const { id } = req.params;
    try {
        const category = await Category.findById(id);
        if (!category) {
            return res.status(404).json({ message: 'Categoría no encontrada' });
        }

        // Si hay productos asociados, transferirlos a una categoría predeterminada
        const defaultCategory = await Category.findOne({ name: 'General' }); // Suponiendo que 'General' es la categoría predeterminada
        if (defaultCategory) {
            await Product.updateMany({ category: category._id }, { $set: { category: defaultCategory._id } });
        }

        // Eliminar la categoría
        await Category.findByIdAndDelete(id);
        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la categoría', error });
    }
};

module.exports = { createCategory, getCategories, updateCategory, deleteCategory };
