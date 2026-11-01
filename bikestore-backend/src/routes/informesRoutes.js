import { Router } from 'express';
import { obtenerInformeDeVentas } from '../controllers/informesController.js';
import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta protegida para informes de ventas con filtros
router.get('/informes/ventas', verificarToken, esAdmin, obtenerInformeDeVentas);

export default router;