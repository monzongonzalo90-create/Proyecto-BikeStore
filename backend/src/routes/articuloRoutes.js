const express = require('express');
const router = express.Router();
const { obtenerArticulos } = require('../controllers/articuloController');

router.get('/', obtenerArticulos);

module.exports = router;
