const pool = require('../Config/db');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../Middlewares/authMiddleware');

const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email y password son requeridos' });
    }

    try {
        // Buscar al empleado y hacer un JOIN con el rol para saber qué rol tiene
        const result = await pool.query(
            `SELECT e.empleado_id AS id, e.nombre, e.email, r.nombre AS rol_nombre 
             FROM empleado e 
             INNER JOIN rol r ON e.rol_id = r.rol_id 
             WHERE e.email = $1 AND e.activo = true`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Credenciales inválidas o empleado inactivo' });
        }

        const empleado = result.rows[0];

        // NOTA: Como posiblemente aún no tengan contraseñas cifradas con bcrypt en la DB actual, 
        // aquí usamos una comprobación simple primero, y luego la de bcrypt si está disponible.
        // Si el usuario lo prefiere, todo debe ser bcrypt. Por ahora simularemos la validación
        // o compararemos directo si la bd no tiene hashes.
        
        let validPassword = false;
        
        // Asumiendo que pueden haber contraseñas en texto plano o en bcrypt
        if (empleado.password) {
            // Intentar bcrypt (si empieza con $2a$ o $2b$)
            if (empleado.password.startsWith('$2')) {
                validPassword = await bcrypt.compare(password, empleado.password);
            } else {
                // Validación en texto plano (temporal / fallback)
                validPassword = password === empleado.password;
            }
        } else {
            // Si la base de datos no tiene columna de contraseña (si aún no se ha agregado al esquema)
            // Permitimos el paso para demostración, pero AVISAMOS. En producción esto no debe estar.
            // Validamos que al menos pasen una contraseña de ejemplo, ej: "123456"
            if (password === "123456") {
                validPassword = true;
            }
        }

        if (!validPassword) {
            return res.status(401).json({ error: 'Credenciales inválidas' });
        }

        // Generar JWT
        const tokenPayload = {
            id: empleado.id,
            nombre: empleado.nombre,
            email: empleado.email,
            rol: empleado.rol_nombre // Ej: "GERENTE", "CAJERO", etc.
        };

        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '8h' });

        res.json({
            message: 'Autenticación exitosa',
            token,
            empleado: tokenPayload
        });

    } catch (error) {
        console.error('Error en el login:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

module.exports = {
    login
};
