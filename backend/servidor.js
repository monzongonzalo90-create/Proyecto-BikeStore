const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para leer JSON
app.use(express.json());

// Importar tus rutas de artículos
const articuloRoutes = require('./src/routes/articuloRoutes');
app.use('/articulos', articuloRoutes);

// Mensaje de prueba en la raíz
app.get('/', (req, res) => {
    res.send('Servidor funcionando correctamente en el proyecto Bike Store');
});

// ¡ESTA ES LA CLAVE! Asegúrate de tener este listen al final:
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
