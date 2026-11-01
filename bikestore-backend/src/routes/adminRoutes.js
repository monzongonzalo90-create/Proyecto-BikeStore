import { Router } from 'express';
import { obtenerProductos, crearProducto, actualizarProducto, inactivarProducto } from '../controllers/adminController.js';
import { verificarToken, esAdmin } from '../middlewares/authMiddleware.js';

const router = Router();

router.get('/productos', verificarToken, esAdmin, obtenerProductos);
router.post('/productos', verificarToken, esAdmin, crearProducto);
router.put('/productos/:id', verificarToken, esAdmin, actualizarProducto);
router.patch('/productos/:id/inactivar', verificarToken, esAdmin, inactivarProducto);

export default router;