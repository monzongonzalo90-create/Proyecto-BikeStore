import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'clave_secreta_bike_store';

// Middleware para verificar que el usuario envió un Token JWT válido
export const verificarToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Acceso denegado. No se proporcionó un token de autenticación.' });
    }

    const token = authHeader.split(' ')[1]; // Extraer el token después de "Bearer"

    if (!token) {
        return res.status(401).json({ error: 'Formato de token inválido.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.usuario = decoded; // Guardamos los datos del usuario en la petición
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Token inválido o expirado.' });
    }
};

// Middleware para verificar que el usuario tenga rol de administrador (soporta 'esAdmin' o 'isAdmin')
export const esAdmin = (req, res, next) => {
    if (!req.usuario || req.usuario.rol !== 'admin') {
        return res.status(403).json({ error: 'Acceso prohibido. Se requieren privilegios de administrador.' });
    }
    next();
};

// Exportación alternativa por si en algún lado lo llamas isAdmin
export const isAdmin = esAdmin;