// Importamos la conexión a la base de datos (ajusta la ruta si tu archivo se llama diferente)
const db = require('../config/db'); 

// Función para obtener los artículos de la tienda
const obtenerArticulos = (req, res) => {
    const query = 'SELECT * FROM articulos';
    db.query(query, (err, resultados) => {
        if (err) {
            console.error('Error al consultar la base de datos:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json(resultados);
    });
};

module.exports = {
    obtenerArticulos
};
