const pool = require('../config/db');

// 1. Obtener todas las ventas registradas
const getVentas = async (req, res) => {
    try {
        const query = `
            SELECT v.id_venta, v.fecha_venta, v.total, u.nombre AS cliente
            FROM ventas v
            INNER JOIN usuarios u ON v.id_usuario = u.id_usuario
            ORDER BY v.fecha_venta DESC
        `;
        const result = await pool.query(query);
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Error al consultar ventas:', error.message);
        res.status(500).json({ error: 'Error interno al consultar las ventas' });
    }
};

// 2. Registrar una nueva venta (Transacción de Venta + Detalles)
const createVenta = async (req, res) => {
    const client = await pool.connect();
    
    try {
        const { id_usuario, productos } = req.body; 
        // productos es un arreglo: [{ id_producto: 1, cantidad: 2, precio_unitario: 50.00 }]

        // Iniciamos transacción en la BD para garantizar integridad
        await client.query('BEGIN');

        // 1. Calcular el total acumulado
        let total = 0;
        productos.forEach(item => {
            total += item.cantidad * item.precio_unitario;
        });

        // 2. Insertar encabezado de la venta
        const ventaQuery = `
            INSERT INTO ventas (id_usuario, total, fecha_venta)
            VALUES ($1, $2, NOW())
            RETURNING id_venta, fecha_venta, total
        `;
        const ventaResult = await client.query(ventaQuery, [id_usuario, total]);
        const id_venta = ventaResult.rows[0].id_venta;

        // 3. Insertar cada producto en la tabla detalle_ventas
        const detalleQuery = `
            INSERT INTO detalle_ventas (id_venta, id_producto, cantidad, precio_unitario)
            VALUES ($1, $2, $3, $4)
        `;

        for (const item of productos) {
            await client.query(detalleQuery, [
                id_venta,
                item.id_producto,
                item.cantidad,
                item.precio_unitario
            ]);
        }

        // Confirmar transacción
        await client.query('COMMIT');

        res.status(201).json({
            mensaje: 'Venta registrada exitosamente',
            venta: ventaResult.rows[0]
        });

    } catch (error) {
        // En caso de fallo, revertir cualquier cambio en la BD
        await client.query('ROLLBACK');
        console.error('Error al registrar venta:', error.message);
        res.status(500).json({ error: 'Error al procesar la venta' });
    } finally {
        // Liberar el cliente del pool de conexiones
        client.release();
    }
};

module.exports = {
    getVentas,
    createVenta
};
