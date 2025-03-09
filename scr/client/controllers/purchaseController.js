const jwt = require('jsonwebtoken');
const User = require('../../auth/models/userModel');
const Cart = require('../models/cartModel');
const Order = require('../models/orderModel');

const clearCartAfterPurchase = async (userId) => {
    await Cart.findOneAndUpdate({ userId }, { items: [] });
};

const makePurchase = async (req, res) => {
    try {
        const { confirm } = req.body;
        if (confirm !== "yes") {
            return res.status(400).json({ message: "Debes confirmar la compra con 'yes'" });
        }

        // Obtener el userId desde el JWT (esto ya debe estar en req.user debido al middleware de autenticación)
        const { userId } = req.user;

        // Buscar el usuario en la base de datos por su userId
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Obtener el carrito del usuario por su userId
        const cart = await Cart.findOne({ userId }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }

        // Calcular totalAmount y formatear los productos
        const totalAmount = cart.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);
        const formattedItems = cart.items.map(item => ({
            productId: item.productId._id,
            name: item.productId.name,
            quantity: item.quantity,
            price: item.productId.price
        }));

        // Crear la orden
        const order = new Order({
            userId: user._id,
            userName: user.name,
            items: formattedItems,
            totalAmount,
            status: 'pendiente',
        });

        await order.save();
        await clearCartAfterPurchase(user._id);

        res.status(201).json({ message: 'Compra realizada con éxito', order });
    } catch (error) {
        res.status(500).json({ message: "Error al realizar la compra", error });
    }
};

module.exports = { makePurchase };
