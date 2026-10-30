/**
 * @file index.js
 * @description Servidor principal del Backend para BikeStore (Sprint 4).
 */

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import db from './config/db.js';
import pedidoRoutes from './routes/pedidoRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// ==========================================
// MIDDLEWARES GLOBALES
// ==========================================
app.use(cors());
app.use(express.json());
app.use('/api/usuarios', authRoutes);

// ==========================================
// RUTAS DE LA API
// ==========================================
app.use('/api/pedidos', pedidoRoutes);
app.use('/api/usuarios', authRoutes);

// Ruta base de comprobación
app.get('/', (req, res) => {
    res.json({ mensaje: '¡API de BikeStore funcionando correctamente!' });
});

// ==========================================
// INICIO DEL SERVIDOR
// ==========================================
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en el puerto http://localhost:${PORT}`);
});