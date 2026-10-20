const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Importar rutas
const articuloRoutes = require('./src/routes/articuloRoutes');
app.use('/api', articuloRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
    res.send('Servidor del proyecto Bike Store corriendo correctamente.');
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
