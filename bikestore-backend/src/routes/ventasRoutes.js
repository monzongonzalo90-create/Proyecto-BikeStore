const { Router } = require('express');
const router = Router();
const { getVentas, createVenta } = require('../controllers/ventasController');

// Definición de Endpoints
router.get('/', getVentas);
router.post('/', createVenta);

// Exportación del router
module.exports = router;
