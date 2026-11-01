import { Router } from 'express';
import { obtenerMetricasDashboard } from '../controllers/dashboardController.js';
import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta protegida para el tablero de control del administrador
router.get('/dashboard/metricas', verificarToken, esAdmin, obtenerMetricasDashboard);

export default router;