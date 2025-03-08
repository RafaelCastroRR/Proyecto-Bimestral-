const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

// Función para limpiar el carrito después de la compra
const clearCartAfterPurchase = async (userId) => {
    await Cart.findOneAndUpdate({ userId }, { items: [] });
};


const makePurchase = async (req, res) => {
    try {
        // Verificar si el usuario tiene un carrito
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }

        // Calcular totalAmount
        const totalAmount = cart.items.reduce((acc, item) => acc + item.quantity * item.productId.price, 0);

        // Crear la orden
        const order = new Order({
            userId: req.user.id,
            items: cart.items.map(item => ({
                productId: item.productId._id,
                quantity: item.quantity,
                price: item.productId.price
            })),
            totalAmount,
            status: 'pendiente',
        });

        await order.save();
        await clearCartAfterPurchase(req.user.id);

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error al realizar la compra", error });
    }
};

// Obtener historial de compras
const getPurchaseHistory = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el historial de compras", error });
    }
};

module.exports = { makePurchase, getPurchaseHistory };
