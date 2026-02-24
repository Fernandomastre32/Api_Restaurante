const Orden = require('../Models/ordenModel');
const db = require('../Config/db');

const getAllOrdenes = async (req, res) => {
    try {
        const ordenes = await Orden.getAll();
        res.status(200).json(ordenes);
    } catch (error) {
        console.error('Error fetching ordenes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getOrdenById = async (req, res) => {
    try {
        const orden = await Orden.getById(req.params.id);
        if (!orden) return res.status(404).json({ error: 'Orden no encontrada' });
        res.status(200).json(orden);
    } catch (error) {
        console.error('Error fetching orden by id:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createOrdenConDetalle = async (req, res) => {
    const client = await db.pool.connect();
    try {
        const { mesa_id, mesero_id, cliente_id, reservacion_id, observaciones, detalles } = req.body;

        if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
            return res.status(400).json({ error: 'Una orden debe tener al menos un platillo en los detalles' });
        }

        await client.query('BEGIN');

        // 1. Insert Orden
        const ordenInsertQuery = 'INSERT INTO orden (mesa_id, mesero_id, cliente_id, reservacion_id, observaciones) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [mesa_id, mesero_id, cliente_id || null, reservacion_id || null, observaciones || null];
        const { rows: ordenRows } = await client.query(ordenInsertQuery, values);
        const nuevaOrden = ordenRows[0];

        // 2. Cambiar estado de la Mesa
        await client.query("UPDATE mesa SET estado = 'OCUPADA' WHERE mesa_id = $1", [mesa_id]);

        // 3. Insert Detalles
        const detalleQuery = 'INSERT INTO orden_detalle (orden_id, platillo_id, cantidad, precio_unit, notas) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const detallesGuardados = [];

        for (let item of detalles) {
            // Necesitamos el precio_unit del platillo (lo idóneo es buscarlo en BD para evitar manipulación del frontend)
            const platilloRes = await client.query('SELECT precio FROM platillo WHERE platillo_id = $1', [item.platillo_id]);
            if (platilloRes.rows.length === 0) throw new Error(`Platillo ${item.platillo_id} no existe`);

            const precioUnit = platilloRes.rows[0].precio;

            const detalleRes = await client.query(detalleQuery, [
                nuevaOrden.orden_id,
                item.platillo_id,
                item.cantidad,
                precioUnit,
                item.notas || null
            ]);
            detallesGuardados.push(detalleRes.rows[0]);
        }

        await client.query('COMMIT');

        nuevaOrden.detalles = detallesGuardados;
        res.status(201).json({ mensaje: 'Orden y detalles creados exitosamente', orden: nuevaOrden });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating orden en transaccion:', error);
        res.status(500).json({ error: 'Internal Server Error', detalle: error.message });
    } finally {
        client.release();
    }
};

module.exports = { getAllOrdenes, getOrdenById, createOrdenConDetalle };
