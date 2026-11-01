import { pool } from '../config/db.js';

// Generar informe detallado de ventas con soporte de filtros por fecha
export const obtenerInformeDeVentas = async (req, res) => {
    try {
        const { fechaInicio, fechaFin } = req.query;
        
        let query = `
            SELECT p.id, p.fecha_pedido, p.total, u.nombre as cliente, p.estado 
            FROM pedidos p 
            JOIN usuarios u ON p.usuario_id = u.id 
        `;
        
        const params = [];

        // Aplicar filtros de búsqueda por rango de fechas si el administrador los proporciona
        if (fechaInicio && fechaFin) {
            query += ` WHERE p.fecha_pedido BETWEEN ? AND ?`;
            params.push(fechaInicio, fechaFin);
        }

        query += ` ORDER BY p.fecha_pedido DESC`;

        const [ventas] = await pool.query(query, params);

        res.json({
            mensaje: 'Informe de ventas generado con éxito',
            totalRegistros: ventas.length,
            filtrosAplicados: { fechaInicio: fechaInicio || 'N/A', fechaFin: fechaFin || 'N/A' },
            informe: ventas
        });
    } catch (error) {
        console.error('Error al generar el informe de ventas:', error);
        res.status(500).json({ error: 'Error interno al procesar el informe de ventas.', detalle: error.message });
    }
};