import { pool } from '../config/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Clave secreta para los tokens (puedes moverla al .env más adelante)
const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_bike_store';

// Controlador de Registro
export const registrarUsuario = async (req, res) => {
    try {
        const { nombre, email, password, rol } = req.body;

        // Verificar si el usuario ya existe
        const [existingUser] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ error: 'El correo electrónico ya está registrado.' });
        }

        // Cifrar la contraseña
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insertar el nuevo usuario en la base de datos
        const [result] = await pool.query(
            'INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)',
            [nombre, email, hashedPassword, rol || 'cliente']
        );

        res.status(201).json({ 
            mensaje: '¡Usuario registrado con éxito!',
            userId: result.insertId 
        });

    } catch (error) {
        console.error('Error en el registro:', error);
        res.status(500).json({ error: 'Error interno del servidor al registrar.' });
    }
};

// Controlador de Login
export const loginUsuario = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Buscar el usuario por email
        const [users] = await pool.query('SELECT * FROM usuarios WHERE email = ?', [email]);
        if (users.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas (correo o contraseña incorrectos).' });
        }

        const user = users[0];

        // Validar la contraseña cifrada
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Credenciales inválidas (correo o contraseña incorrectos).' });
        }

        // Generar el Token JWT
        const token = jwt.sign(
            { id: user.id, email: user.email, rol: user.rol },
            JWT_SECRET,
            { expiresIn: '8h' }
        );

        res.json({
            mensaje: '¡Inicio de sesión exitoso!',
            token,
            usuario: {
                id: user.id,
                nombre: user.nombre,
                email: user.email,
                rol: user.rol
            }
        });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Error interno del servidor al iniciar sesión.' });
    }
};
