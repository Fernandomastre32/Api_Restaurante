const Mesa = require('../Models/mesaModel');

const getAllMesas = async (req, res) => {
    try {
        const mesas = await Mesa.getAll();
        res.status(200).json(mesas);
    } catch (error) {
        console.error('Error fetching mesas:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getMesaById = async (req, res) => {
    try {
        const mesa = await Mesa.getById(req.params.id);
        if (!mesa) return res.status(404).json({ error: 'Mesa not found' });
        res.status(200).json(mesa);
    } catch (error) {
        console.error('Error fetching mesa:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createMesa = async (req, res) => {
    try {
        const nuevaMesa = await Mesa.create(req.body);
        res.status(201).json(nuevaMesa);
    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'Numero de mesa already exists' });
        console.error('Error creating mesa:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateMesa = async (req, res) => {
    try {
        const updatedMesa = await Mesa.update(req.params.id, req.body);
        if (!updatedMesa) return res.status(404).json({ error: 'Mesa not found' });
        res.status(200).json(updatedMesa);
    } catch (error) {
        console.error('Error updating mesa:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteMesa = async (req, res) => {
    try {
        const deletedMesa = await Mesa.delete(req.params.id);
        if (!deletedMesa) return res.status(404).json({ error: 'Mesa not found' });
        res.status(200).json({ message: 'Mesa deleted successfully' });
    } catch (error) {
        console.error('Error deleting mesa:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllMesas, getMesaById, createMesa, updateMesa, deleteMesa };
