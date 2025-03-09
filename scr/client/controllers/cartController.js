const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Crear un carrito vacío para un usuario
const createCart = async (req, res) => {
    const { userId } = req.body;  // Usamos el userId del cuerpo de la solicitud
    try {
        const existingCart = await Cart.findOne({ userId });

        // Si el carrito ya existe, lo devuelve
        if (existingCart) {
            return res.status(400).json({ message: 'El carrito ya existe' });
        }

        // Crear un carrito vacío
        const cart = new Cart({ userId, items: [] });
        await cart.save();

        res.status(201).json({ message: 'Carrito creado exitosamente', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el carrito', error });
    }
};

// Obtener carrito de un usuario
const getCart = async (req, res) => {
    const { userId } = req.body;  // Usamos el userId del cuerpo de la solicitud
    try {
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart) return res.status(404).json({ message: 'Carrito vacío' });
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito', error });
    }
};
const addToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
        // Buscar el producto en la base de datos para obtener su precio
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        let cart = await Cart.findOne({ userId });

        if (!cart) {
            // Si no existe el carrito, lo creamos con el producto y su precio
            cart = new Cart({
                userId,
                items: [{ productId, quantity, price: product.price }] // Se asigna correctamente el precio
            });
        } else {
            // Buscar si el producto ya está en el carrito
            const existingProductIndex = cart.items.findIndex(item => item.productId.toString() === productId);

            if (existingProductIndex >= 0) {
                // Si ya existe, actualizamos la cantidad
                cart.items[existingProductIndex].quantity += quantity;
            } else {
                // Si no existe, lo agregamos asegurando el precio
                cart.items.push({ productId, quantity, price: product.price });
            }
        }

        await cart.save();
        res.status(200).json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar al carrito', error });
    }
};




module.exports = { createCart, addToCart, getCart };
