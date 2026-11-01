/**
 * @file adminMiddleware.js
 * @description Middleware para verificar privilegios de administrador.
 */
export const verificarAdmin = (req, res, next) => {
    try {
        if (!req.usuario || req.usuario.es_admin !== true) {
            return res.status(403).json({
                ok: false,
                mensaje: "Acceso denegado. Se requieren privilegios de administrador."
            });
        }
        next();
    } catch (error) {
        console.error("Error en adminMiddleware:", error.message);
        return res.status(500).json({
            ok: false,
            mensaje: "Error interno en la validación de administrador."
        });
    }
};