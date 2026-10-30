import { Router } from 'express';
import { registrarUsuario, loginUsuario } from '../controllers/authController.js';

const router = Router();

// Ruta POST para registrar usuarios
router.post('/register', registrarUsuario);

// Ruta POST para iniciar sesión
router.post('/login', loginUsuario);

export default router;

