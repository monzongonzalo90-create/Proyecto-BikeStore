import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwtSecret.js';

const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    console.log("--> JWT_SECRET usado en Middleware:", JWT_SECRET);
    console.log("--> Token recibido:", token ? token.substring(0, 15) + "..." : "Ninguno");

    if (!token) {
        return res.status(401).json({ mensaje: "Token no proporcionado o cabecera ausente." });
    }

    try {
        const decodificado = jwt.verify(token, JWT_SECRET);
        req.usuario = decodificado;
        next();
    } catch (error) {
        console.error("--> Error al verificar el token:", error.message);
        return res.status(403).json({ mensaje: "Token inválido o expirado." });
    }
};

export default verificarToken;