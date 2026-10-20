const db = require('../config/db');

const obtenerArticulos = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM articulos');
        return res.json(rows);
    } catch (error) {
        // Imprimimos el error técnico completo en la terminal de VS Code
        console.error('DETALLE TÉCNICO DEL ERROR SQL:', error.message);
        return res.status(500).json({ error: error.message }); // Lo enviamos temporalmente al navegador para verlo
    }
};

module.exports = { obtenerArticulos };
