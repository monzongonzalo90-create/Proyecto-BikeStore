const express = require('express');
const router = express.Router();

// Importamos el controlador asegurando la ruta relativa correcta desde 'routes' hacia 'controllers'
const { obtenerArticulos } = require('../controllers/articuloController');


// Definimos la ruta GET para el catálogo
router.get('/articulos', obtenerArticulos);

module.exports = router;

