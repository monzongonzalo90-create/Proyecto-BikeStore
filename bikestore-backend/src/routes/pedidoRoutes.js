import { Router } from 'express';
import { realizarCheckout } from '../controllers/pedidoController.js';
import verificarToken from '../middlewares/authMiddleware.js';

const router = Router();

// ¡El orden importa! Primero la ruta, luego el middleware de seguridad, y por último el controlador
router.post('/checkout', verificarToken, realizarCheckout);

export default router;