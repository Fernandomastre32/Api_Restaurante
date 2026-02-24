const Insumo = require('../Models/insumoModel');

const getAllInsumos = async (req, res) => {
    try {
        const insumos = await Insumo.getAll();
        res.status(200).json(insumos);
    } catch (error) {
        console.error('Error fetching insumos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getInsumoById = async (req, res) => {
    try {
        const insumo = await Insumo.getById(req.params.id);
        if (!insumo) return res.status(404).json({ error: 'Insumo not found' });
        res.status(200).json(insumo);
    } catch (error) {
        console.error('Error fetching insumo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createInsumo = async (req, res) => {
    try {
        const nuevoInsumo = await Insumo.create(req.body);
        res.status(201).json(nuevoInsumo);
    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'Insumo already exists' });
        console.error('Error creating insumo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateInsumo = async (req, res) => {
    try {
        const updatedInsumo = await Insumo.update(req.params.id, req.body);
        if (!updatedInsumo) return res.status(404).json({ error: 'Insumo not found' });
        res.status(200).json(updatedInsumo);
    } catch (error) {
        console.error('Error updating insumo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteInsumo = async (req, res) => {
    try {
        const deletedInsumo = await Insumo.delete(req.params.id);
        if (!deletedInsumo) return res.status(404).json({ error: 'Insumo not found' });
        res.status(200).json({ message: 'Insumo deleted successfully' });
    } catch (error) {
        console.error('Error deleting insumo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllInsumos, getInsumoById, createInsumo, updateInsumo, deleteInsumo };
