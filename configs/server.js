// configs/server.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('../scr/auth/routes/authRoutes');

// Admin
const adminRoutes = require('../scr/admin/routes/productRoutes');
const useRoutes1 = require('../scr/admin/routes/userRoutes');
const categoryRoutes = require('../scr/admin/routes/categoryRoutes');
const invoiceRoutes = require('../scr/admin/routes/invoiceRoutes');

// Client
const clientRoutes = require('../scr/client/routes/productRoutes');
const profileRoutes = require('../scr/client/routes/profileRoutes');
const historyRoutes = require('../scr/client/routes/historyRoutes');
const cartRoutes = require('../scr/client/routes/cartRoutes');
const purchaseRoutes = require('../scr/client/routes/purchaseRoutes');

const errorHandler = require('../scr/helpers/errorHandler');

// Importa el modelo de categoría
const Category = require('../scr/admin/models/categoryModel'); // Asegúrate de que la ruta sea correcta

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Crear la categoría "General" si no existe
const createGeneralCategory = async () => {
    try {
        const categoryExists = await Category.findOne({ name: 'General' });
        if (!categoryExists) {
            const generalCategory = new Category({
                name: 'General',
                description: 'Categoría predeterminada para productos sin categoría asignada.',
            });
            await generalCategory.save();
            console.log('Categoría "General" creada');
        } else {
            console.log('La categoría "General" ya existe');
        }
    } catch (error) {
        console.error('Error al crear la categoría "General":', error);
    }
};

// Ejecutar la creación de la categoría "General" al iniciar el servidor
createGeneralCategory();

// Rutas de autenticación y otras rutas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/client', clientRoutes);
app.use('/api/user', useRoutes1);
app.use('/profile', profileRoutes);
app.use('/api/history', historyRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/purchase', purchaseRoutes);
app.use('/api/category', categoryRoutes);
app.use('/api/invoice', invoiceRoutes);

// Middleware para manejo de errores
app.use(errorHandler);

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB', err);
    });

// Configuración del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Exporta la función initServer para ser llamada desde index.js
module.exports = { initServer: () => app };
