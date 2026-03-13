const jwt = require('jsonwebtoken');

// Secret Key (should be in .env in production)
const JWT_SECRET = process.env.JWT_SECRET || 'super_secret_key_restaurante';

/**
 * Middleware para verificar que el usuario esté autenticado con un JWT válido
 */
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ error: 'Un token es requerido para la autenticación' });
    }

    const token = authHeader.split(' ')[1]; // Formato: "Bearer <token>"
    if (!token) {
        return res.status(403).json({ error: 'Token malformado o no proporcionado' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded; // ej: { id: 1, rol: 'COCINA' }
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido o expirado' });
    }
    return next();
};

/**
 * Middleware para el Control de Acceso Basado en Roles (RBAC)
 * @param {Array<string>} allowedRoles - Arreglo de roles permitidos (Ej: ['GERENTE', 'CAJERO'])
 */
const checkRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user || !req.user.rol) {
            return res.status(403).json({ error: 'Información de rol no encontrada en el token' });
        }

        const userRole = req.user.rol.toUpperCase();
        
        // El GERENTE normalmente tiene acceso a todo, si quieres que gerente siempre pase:
        if (userRole === 'GERENTE') {
            return next();
        }

        if (allowedRoles.includes(userRole)) {
            return next();
        }

        return res.status(403).json({ error: 'No tienes los permisos necesarios para realizar esta acción' });
    };
};

module.exports = {
    verifyToken,
    checkRole,
    JWT_SECRET
};
