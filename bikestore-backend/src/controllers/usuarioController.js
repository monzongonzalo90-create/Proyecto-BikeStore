import pool from '../config/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { JWT_SECRET } from '../config/jwtSecret.js';

// Obtener todos los usuarios
export const getUsuarios = async (req, res) => {
    try {
        const result = await pool.query('SELECT id_usuario, nombre, email, rol, fecha_creacion FROM usuarios');
        res.json(result.rows);
    } catch (error) {
        console.error('Error al obtener usuarios:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Obtener usuario por ID
export const getUsuarioById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT id_usuario, nombre, email, rol, fecha_creacion FROM usuarios WHERE id_usuario = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error al obtener el usuario:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Login de usuario
export const loginUsuario = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ mensaje: 'Usuario no encontrado' });
        }

        const usuario = result.rows[0];

        const passwordValida = await bcrypt.compare(password, usuario.password);
        if (!passwordValida) {
            return res.status(401).json({ mensaje: 'Contraseña incorrecta' });
        }

        // Generar el token JWT utilizando la clave centralizada
        const token = jwt.sign(
            { 
                id: usuario.id_usuario, 
                email: usuario.email, 
                rol: usuario.rol 
            }, 
            JWT_SECRET, 
            { expiresIn: '1h' }
        );

        return res.json({
            mensaje: "¡Inicio de sesión exitoso!",
            token,
            usuario: {
                id: usuario.id_usuario,
                nombre: usuario.nombre,
                email: usuario.email,
                rol: usuario.rol
            }
        });

    } catch (error) {
        console.error('Error en el login:', error.message);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};