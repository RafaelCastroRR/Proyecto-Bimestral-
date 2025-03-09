'use strict';

import mongoose from "mongoose";

// Función para la conexión a la base de datos
export const dbConnection = async () => {
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB | Error de conexión:', err.message);
    });

    mongoose.connection.on('connecting', () => {
        console.log('MongoDB | Intentando conectar...');
    });

    mongoose.connection.on('connected', () => {
        console.log('MongoDB | Conectado a la base de datos');
    });

    mongoose.connection.on('reconnected', () => {
        console.log('MongoDB | Reconectado a la base de datos');
    });

    mongoose.connection.on('disconnected', () => {
        console.log('MongoDB | Desconectado');
    });

    try {
        // Realizar la conexión a MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Timeout para la selección de servidor
            maxPoolSize: 50, // Máxima cantidad de conexiones en el pool
        });

        console.log('MongoDB | Conexión a la base de datos establecida');

    } catch (error) {
        console.error('MongoDB | No se pudo conectar a la base de datos:', error);
    }
};
