import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Importación de rutas
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import informesRoutes from './routes/informesRoutes.js'; // Ruta para los informes del Sprint 6

dotenv.config();

const app = express();

// Middlewares globales
app.use(express.json());
app.use(cors());

// Configuración de Endpoints / Rutas
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/admin', dashboardRoutes);
app.use('/api/admin', informesRoutes);

// Endpoint de salud del servidor (Health Check) para pruebas de integración (Sprint 7)
app.get('/api/health', (req, res) => {
    res.status(200).json({
        estado: 'OK',
        servicio: 'BikeStore Backend API',
        timestamp: new Date().toISOString()
    });
});

// Configuración del puerto dinámico y arranque único del servidor
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor corriendo exitosamente en el puerto ${PORT}`);
});