const { Router } = require('express');
const router = Router();
const pool = require('../config/db'); // Importa la conexión a PostgreSQL

// 1. Obtener todos los productos
router.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM productos');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener productos:', error.message);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

// 2. Obtener un producto por ID
router.get('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM productos WHERE id_producto = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Producto no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener producto:', error.message);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// 3. Crear un nuevo producto
router.post('/', async (req, res) => {
    const { nombre, descripcion, precio, stock, id_categoria } = req.body;
    try {
        const result = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, id_categoria) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nombre, descripcion, precio, stock, id_categoria]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error al crear producto:', error.message);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});

// ⚠️ CLAVE: Exportar el router para que index.js lo reciba correctamente
module.exports = router;

