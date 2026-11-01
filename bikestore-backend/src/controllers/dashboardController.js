import { pool } from '../config/db.js';

// Obtener métricas generales para el Dashboard del Administrador
export const obtenerMetricasDashboard = async (req, res) => {
    try {
        // 1. Total de productos activos en el catálogo
        const [totalProductos] = await pool.query(
            'SELECT COUNT(*) as count FROM productos WHERE activo = 1'
        );

        // 2. Total de usuarios registrados en el sistema
        const [totalUsuarios] = await pool.query(
            'SELECT COUNT(*) as count FROM usuarios'
        );

        // 3. Total de ventas generales y recaudo acumulado (asumiendo una tabla de pedidos/ventas)
        const [totalVentas] = await pool.query(
            'SELECT COUNT(*) as total_pedidos, COALESCE(SUM(total), 0) as ingresos_totales FROM pedidos'
        );

        res.json({
            mensaje: 'Métricas del dashboard obtenidas con éxito',
            estadisticas: {
                productosActivos: totalProductos[0].count,
                usuariosRegistrados: totalUsuarios[0].count,
                totalPedidos: totalVentas[0].total_pedidos,
                ingresosTotales: totalVentas[0].ingresos_totales
            }
        });
    } catch (error) {
        console.error('Error al obtener métricas del dashboard:', error);
        res.status(500).json({ error: 'Error interno al consultar las métricas del dashboard.', detalle: error.message });
    }
};