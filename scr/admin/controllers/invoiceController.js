const Invoice = require('../models/invoiceModel');

// Crear una nueva factura
const createInvoice = async (req, res) => {
  try {
    const { user, products, total } = req.body;
    const newInvoice = new Invoice({ user, products, total });
    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(500).json({ message: 'Error al crear la factura', error: err });
  }
};

// Obtener facturas de un usuario
const getInvoicesByUser = async (req, res) => {
  try {
    const invoices = await Invoice.find({ user: req.params.userId });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener facturas', error: err });
  }
};

module.exports = {
  createInvoice,
  getInvoicesByUser
};
