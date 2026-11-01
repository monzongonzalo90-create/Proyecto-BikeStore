import { pool } from '../config/db.js';

// Listar todos los productos
export const obtenerProductos = async (req, res) => {
    try {
        const [productos] = await pool.query('SELECT * FROM productos');
        res.json(productos);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error interno al obtener los productos.' });
    }
};

// Crear un nuevo producto
export const crearProducto = async (req, res) => {
    try {
        const { nombre, descripcion, precio, stock, categoria } = req.body;

        const [result] = await pool.query(
            'INSERT INTO productos (nombre, descripcion, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)',
            [nombre, descripcion, precio, stock, categoria]
        );

        res.status(201).json({
            mensaje: '¡Producto creado con éxito!',
            productId: result.insertId
        });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error interno al crear el producto.', detalle: error.message });
    }
};

// Actualizar precio y stock de un producto
export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { precio, stock } = req.body;

        const [result] = await pool.query(
            'UPDATE productos SET precio = ?, stock = ? WHERE id = ?',
            [precio, stock, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        res.json({
            mensaje: '¡Precio y stock actualizados con éxito!',
            productId: id
        });
    } catch (error) {
        console.error('Error al actualizar producto:', error);
        res.status(500).json({ error: 'Error interno al actualizar el producto.', detalle: error.message });
    }
};

// Inactivación lógica de un producto
export const inactivarProducto = async (req, res) => {
    try {
        const { id } = req.params;

        const [result] = await pool.query(
            'UPDATE productos SET activo = 0 WHERE id = ?',
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado.' });
        }

        res.json({
            mensaje: '¡Producto inactivado con éxito (inactivación lógica)!',
            productId: id
        });
    } catch (error) {
        console.error('Error al inactivar producto:', error);
        res.status(500).json({ error: 'Error interno al inactivar el producto.', detalle: error.message });
    }
};