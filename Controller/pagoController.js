const Pago = require('../Models/pagoModel');
const db = require('../Config/db'); // Needed for updating orden status if necessary

const getAllPagos = async (req, res) => {
    try {
        const pagos = await Pago.getAll();
        res.status(200).json(pagos);
    } catch (error) {
        console.error('Error fetching pagos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPagoById = async (req, res) => {
    try {
        const pago = await Pago.getById(req.params.id);
        if (!pago) return res.status(404).json({ error: 'Pago no encontrado' });
        res.status(200).json(pago);
    } catch (error) {
        console.error('Error fetching pago by id:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createPago = async (req, res) => {
    try {
        const { orden_id, metodo, monto, referencia } = req.body;

        // Transacción básica: Creamos el pago y validamos cerrar la orden si es el total.
        // Usaremos pool.query pero idealmente debería ser pool.connect() -> await client.query('BEGIN')

        const nuevoPago = await Pago.create({ orden_id, metodo, monto, referencia });

        // Opcionalmente podemos actualizar el estado de la Orden a 'CERRADA'
        await db.query("UPDATE orden SET estado = 'CERRADA', fecha_cierre = NOW() WHERE orden_id = $1", [orden_id]);

        res.status(201).json({ pago: nuevoPago, message: 'Pago registrado y orden cerrada' });
    } catch (error) {
        console.error('Error creating pago:', error);
        if (error.code === '23503') return res.status(400).json({ error: 'Orden Invalida' });
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllPagos, getPagoById, createPago };
