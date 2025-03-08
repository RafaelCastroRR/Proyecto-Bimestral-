// src/middlewares/authMiddleware.js

const jwt = require('jsonwebtoken');

// Middleware general de autenticación con roles
const authMiddleware = (roles = []) => {
    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;

            if (roles.length && !roles.includes(req.user.role)) {
                return res.status(403).json({ message: 'Insufficient permissions' });
            }

            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
};

const verifyAdmin = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;

        // Verificar si el rol es 'ADMIN'
        if (req.user.role !== 'ADMIN') {
            return res.status(403).json({ message: 'No tienes permisos para realizar esta acción' });
        }

        next(); // Permitir la acción si es ADMIN
    } catch (error) {
        res.status(401).json({ message: 'Acceso no autorizado', error });
    }
};

module.exports = { verifyAdmin };

// Exporta ambos middleware correctamente
module.exports = { authMiddleware, verifyAdmin };
