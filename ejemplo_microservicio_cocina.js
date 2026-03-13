const express = require('express');
const app = express();
const port = 3001; // Corre en otro puerto diferente al monolito (3000)

app.use(express.json());

// Simulamos una base de datos o conexión externa solo para este servicio
let comandasActivas = [
    { id: 1, mesa: 5, platillo: 'Enchiladas', estado: 'PENDIENTE', tiempoEstimadoMin: 15 },
    { id: 2, mesa: 2, platillo: 'Sopa de Tortilla', estado: 'EN_PREPARACION', tiempoEstimadoMin: 10 }
];

// Middleware de Autenticación simulado (Solo COCINA y CHEF pueden usar esto)
const verificarRolCocina = (req, res, next) => {
    // En la vida real, sacarías esto de un JWT (Token)
    const rolUsuario = req.headers['x-user-role'];

    if (rolUsuario === 'COCINA' || rolUsuario === 'CHEF' || rolUsuario === 'AYUDANTE_COCINA') {
        next();
    } else {
        res.status(403).json({ error: 'Acceso Denegado: Solo el personal de cocina puede ver las comandas.' });
    }
};

// ==========================================
// RUTAS EXCLUSIVAS DEL MICROSERVICIO DE COCINA
// ==========================================

// 1. CHEF/COCINA ve la pantalla de pedidos pendientes (KDS)
app.get('/api/cocina/comandas', verificarRolCocina, (req, res) => {
    // Solo devolvemos lo que no se ha entregado
    const pendientes = comandasActivas.filter(c => c.estado !== 'LISTA');
    res.json({ comandas: pendientes });
});

// 2. COCINERO marca un platillo como "EN PREPARACION" o "LISTO"
app.put('/api/cocina/comandas/:id/estado', verificarRolCocina, (req, res) => {
    const { estado } = req.body;
    const comanda = comandasActivas.find(c => c.id === parseInt(req.params.id));

    if (!comanda) return res.status(404).json({ error: 'Comanda no encontrada' });

    comanda.estado = estado; // Ej: 'LISTA'

    // Aquí (en la vida real) le mandaríamos un mensaje (RabbitMQ/Kafka) al Microservicio de Comedor
    // para que la tablet del MESERO pite y sepa que ya puede ir por el plato a la barra.
    console.log(`[EVENTO] Notificando al Mesero de la Mesa ${comanda.mesa} que su platillo está ${estado}`);

    res.json({ mensaje: `Comanda actualizada a ${estado}`, comanda });
});

app.listen(port, () => {
    console.log(`👨‍🍳 Microservicio de PRODUCCIÓN (Cocina) corriendo en http://localhost:${port}`);
});
