const express = require('express');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const app = express();
const port = process.env.PORT || 3000;

// Swagger Options
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Restaurante API',
            version: '1.0.0',
            description: 'API de administración para Microservicios de Restaurante',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Servidor Local'
            }
        ]
    },
    apis: ['./Routes/*.js'] // Ruta donde Swagger mirará nuestros comentarios
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
const rolRoutes = require('./Routes/rolRoutes');
const empleadoRoutes = require('./Routes/empleadoRoutes');
const clienteRoutes = require('./Routes/clienteRoutes');
const mesaRoutes = require('./Routes/mesaRoutes');
const categoriaMenuRoutes = require('./Routes/categoriaMenuRoutes');
const platilloRoutes = require('./Routes/platilloRoutes');
const turnoRoutes = require('./Routes/turnoRoutes');
const proveedorRoutes = require('./Routes/proveedorRoutes');
const insumoRoutes = require('./Routes/insumoRoutes');

// Transactional Routes
const reservacionRoutes = require('./Routes/reservacionRoutes');
const turnoAsignacionRoutes = require('./Routes/turnoAsignacionRoutes');
const recetaIngredienteRoutes = require('./Routes/recetaIngredienteRoutes');
const inventarioMovimientoRoutes = require('./Routes/inventarioMovimientoRoutes');
const pagoRoutes = require('./Routes/pagoRoutes');
const ordenRoutes = require('./Routes/ordenRoutes');
const compraRoutes = require('./Routes/compraRoutes');

app.use('/api/roles', rolRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/mesas', mesaRoutes);
app.use('/api/categorias', categoriaMenuRoutes);
app.use('/api/platillos', platilloRoutes);
app.use('/api/turnos', turnoRoutes);
app.use('/api/proveedores', proveedorRoutes);
app.use('/api/insumos', insumoRoutes);

app.use('/api/reservaciones', reservacionRoutes);
app.use('/api/turno-asignacion', turnoAsignacionRoutes);
app.use('/api/recetas', recetaIngredienteRoutes);
app.use('/api/inventario', inventarioMovimientoRoutes);
app.use('/api/pagos', pagoRoutes);
app.use('/api/ordenes', ordenRoutes);
app.use('/api/compras', compraRoutes);

app.get('/api/health', (req, res) => {
    res.json({ status: 'API is running' });
});

// Start Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
