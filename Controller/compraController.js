const Compra = require('../Models/compraModel');
const db = require('../Config/db');

const getAllCompras = async (req, res) => {
    try {
        const compras = await Compra.getAll();
        res.status(200).json(compras);
    } catch (error) {
        console.error('Error fetching compras:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCompraById = async (req, res) => {
    try {
        const compra = await Compra.getById(req.params.id);
        if (!compra) return res.status(404).json({ error: 'Compra no encontrada' });
        res.status(200).json(compra);
    } catch (error) {
        console.error('Error fetching compra by id:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createCompraConDetalle = async (req, res) => {
    const client = await db.pool.connect();
    try {
        const { proveedor_id, comprador_id, folio, estado, detalles } = req.body;

        if (!detalles || !Array.isArray(detalles) || detalles.length === 0) {
            return res.status(400).json({ error: 'Una compra debe tener al menos un insumo en los detalles' });
        }

        await client.query('BEGIN');

        // Calculamos el total de la compra sumando subtotales
        let totalCálculado = 0;

        // 1. Insertar la Compra inicialmente con total 0, lo actualizaremos después
        const compraQuery = 'INSERT INTO compra (proveedor_id, comprador_id, folio, estado, total) VALUES ($1, $2, $3, $4, 0) RETURNING *';
        const { rows: compraRows } = await client.query(compraQuery, [proveedor_id, comprador_id, folio || null, estado || 'RECIBIDA']);
        const nuevaCompra = compraRows[0];

        // 2. Insert Detalles
        const detalleQuery = 'INSERT INTO compra_detalle (compra_id, insumo_id, cantidad, costo_unit, subtotal) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const detallesGuardados = [];

        for (let item of detalles) {
            const subtotal = item.cantidad * item.costo_unit;
            totalCálculado += subtotal;

            const detalleRes = await client.query(detalleQuery, [
                nuevaCompra.compra_id,
                item.insumo_id,
                item.cantidad,
                item.costo_unit,
                subtotal
            ]);
            detallesGuardados.push(detalleRes.rows[0]);

            // Actualizamos el stock del inventario (si el estado indica que ya se recibio)
            if (nuevaCompra.estado === 'RECIBIDA') {
                const inventarioQuery = 'UPDATE insumo SET stock_actual = stock_actual + $1 WHERE insumo_id = $2';
                await client.query(inventarioQuery, [item.cantidad, item.insumo_id]);
            }
        }

        // 3. Actualizamos el total real de la Compra
        const updateCompraQuery = 'UPDATE compra SET total = $1 WHERE compra_id = $2 RETURNING *';
        const { rows: updateCompraRows } = await client.query(updateCompraQuery, [totalCálculado, nuevaCompra.compra_id]);

        await client.query('COMMIT');

        const result = updateCompraRows[0];
        result.detalles = detallesGuardados;

        res.status(201).json({ mensaje: 'Compra, detalles e inventario registrados exitosamente', compra: result });

    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating compra en transaccion:', error);
        res.status(500).json({ error: 'Internal Server Error', detalle: error.message });
    } finally {
        client.release();
    }
};

module.exports = { getAllCompras, getCompraById, createCompraConDetalle };
