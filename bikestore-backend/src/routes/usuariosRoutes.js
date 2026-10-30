import usuarioRoutes from './routes/usuarioRoutes.js';
const { Router } = require('express');
const router = Router();
const { getUsuarios, getUsuarioById, createUsuario } = require('../controllers/usuariosController');

router.get('/', getUsuarios);
router.get('/:id', getUsuarioById);
router.post('/', createUsuario);

// Exportación del router para el index
module.exports = router;
