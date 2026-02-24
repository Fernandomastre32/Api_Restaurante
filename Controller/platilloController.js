const Platillo = require('../Models/platilloModel');

const getAllPlatillos = async (req, res) => {
    try {
        const platillos = await Platillo.getAll();
        res.status(200).json(platillos);
    } catch (error) {
        console.error('Error fetching platillos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getPlatilloById = async (req, res) => {
    try {
        const platillo = await Platillo.getById(req.params.id);
        if (!platillo) return res.status(404).json({ error: 'Platillo not found' });
        res.status(200).json(platillo);
    } catch (error) {
        console.error('Error fetching platillo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createPlatillo = async (req, res) => {
    try {
        const nuevoPlatillo = await Platillo.create(req.body);
        res.status(201).json(nuevoPlatillo);
    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'Platillo already exists in this category' });
        if (error.code === '23503') return res.status(400).json({ error: 'Invalid categoria_id' });
        console.error('Error creating platillo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updatePlatillo = async (req, res) => {
    try {
        const updatedPlatillo = await Platillo.update(req.params.id, req.body);
        if (!updatedPlatillo) return res.status(404).json({ error: 'Platillo not found' });
        res.status(200).json(updatedPlatillo);
    } catch (error) {
        console.error('Error updating platillo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deletePlatillo = async (req, res) => {
    try {
        const deletedPlatillo = await Platillo.delete(req.params.id);
        if (!deletedPlatillo) return res.status(404).json({ error: 'Platillo not found' });
        res.status(200).json({ message: 'Platillo deleted successfully' });
    } catch (error) {
        console.error('Error deleting platillo:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllPlatillos, getPlatilloById, createPlatillo, updatePlatillo, deletePlatillo };
