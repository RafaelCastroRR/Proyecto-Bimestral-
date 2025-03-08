const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel'); // Asegúrate de que el modelo del producto esté importado

// Realizar compra
const makePurchase = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate('items.productId');
        
        // Verificar si el carrito existe y si tiene productos
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'El carrito está vacío' });
        }

        // Calcular el totalAmount usando el precio del producto
        const totalAmount = cart.items.reduce((acc, item) => {
            return acc + item.quantity * item.productId.price; // Asegúrate de acceder correctamente al precio del producto
        }, 0);

        // Crear la orden con los detalles del carrito
        const order = new Order({
            userId: req.user.id,
            items: cart.items.map(item => ({
                productId: item.productId._id,  // Guardar solo el ID del producto
                quantity: item.quantity,
                price: item.productId.price // Guardar precio de cada producto
            })),
            totalAmount,
            status: 'pendiente', // Puedes cambiar el estado si es necesario
        });

        await order.save();

        // Limpiar carrito después de realizar la compra
        cart.items = [];
        await cart.save();

        res.status(201).json(order);  // Enviar la orden como respuesta
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
