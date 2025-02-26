'use strict';

import mongoose from "mongoose";

export const dbConnection = async () => {
    try {
        mongoose.connection.on('error', () => {
            console.log('MongoDB | Could not be connected to MongoDB');
            mongoose.disconnect();
        });
        mongoose.connection.on('connecting', () => {
            console.log('MongoDB | Trying to connect...');
        });
        mongoose.connection.on('connected', () => {
            console.log('MongoDB | Connected to MongoDB');
        });
        mongoose.connection.on('open', () => {
            console.log('MongoDB | Connection to database established');
        });
        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB | Reconnected to MongoDB');
        });
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB | Disconnected');
        });

        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            maxPoolSize: 50,
        });

    } catch (error) {
        console.log('Database connection failed', error);
    }
};

