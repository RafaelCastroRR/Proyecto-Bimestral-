const Order = require('../models/orderModel');

// Obtener historial de compras
const getHistory = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener historial de compras", error });
    }
};

module.exports = { getHistory };
