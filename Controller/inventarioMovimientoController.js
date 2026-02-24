const InventarioMovimiento = require('../Models/inventarioMovimientoModel');

const getAllMovimientos = async (req, res) => {
    try {
        const movimientos = await InventarioMovimiento.getAll();
        res.status(200).json(movimientos);
    } catch (error) {
        console.error('Error fetching movimientos inventario:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getMovimientoById = async (req, res) => {
    try {
        const movimiento = await InventarioMovimiento.getById(req.params.id);
        if (!movimiento) return res.status(404).json({ error: 'Movimiento no encontrado' });
        res.status(200).json(movimiento);
    } catch (error) {
        console.error('Error fetching getMovimientoById:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createMovimiento = async (req, res) => {
    try {
        const nuevoMovimiento = await InventarioMovimiento.create(req.body);
        res.status(201).json(nuevoMovimiento);
    } catch (error) {
        console.error('Error creating inventario_movimiento:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllMovimientos, getMovimientoById, createMovimiento };
