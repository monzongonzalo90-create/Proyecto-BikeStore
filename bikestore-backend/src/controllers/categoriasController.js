const pool = require('../config/db');

// Obtener todas las categorías
const getCategorias = async (req, res) => {
  try {
    const resultado = await pool.query('SELECT * FROM categorias ORDER BY categoria_id ASC');
    res.status(200).json({
      ok: true,
      data: resultado.rows
    });
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    res.status(500).json({
      ok: false,
      message: 'Error en el servidor al consultar categorías'
    });
  }
};

// Crear una nueva categoría
const createCategoria = async (req, res) => {
  const { nombre, descripcion } = req.body;

  if (!nombre) {
    return res.status(400).json({ ok: false, message: 'El nombre de la categoría es obligatorio' });
  }

  try {
    const query = 'INSERT INTO categorias (nombre, descripcion) VALUES ($1, $2) RETURNING *';
    const valores = [nombre, descripcion];
    const resultado = await pool.query(query, valores);

    res.status(201).json({
      ok: true,
      message: 'Categoría creada exitosamente',
      data: resultado.rows[0]
    });
  } catch (error) {
    console.error('Error al crear categoría:', error);
    res.status(500).json({ ok: false, message: 'Error interno del servidor' });
  }
};

module.exports = {
  getCategorias,
  createCategoria
};
