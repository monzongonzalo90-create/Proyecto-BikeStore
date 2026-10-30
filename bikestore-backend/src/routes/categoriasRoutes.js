const { Router } = require('express');
const { getCategorias, createCategoria } = require('../controllers/categoriasController');

const router = Router();

// GET /api/categorias
router.get('/', getCategorias);

// POST /api/categorias
router.post('/', createCategoria);

module.exports = router;
