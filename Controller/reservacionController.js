const Reservacion = require('../Models/reservacionModel');

const getAllReservaciones = async (req, res) => {
    try {
        const reservaciones = await Reservacion.getAll();
        res.status(200).json(reservaciones);
    } catch (error) {
        console.error('Error fetching reservaciones:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getReservacionById = async (req, res) => {
    try {
        const reservacion = await Reservacion.getById(req.params.id);
        if (!reservacion) return res.status(404).json({ error: 'Reservacion not found' });
        res.status(200).json(reservacion);
    } catch (error) {
        console.error('Error fetching reservacion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createReservacion = async (req, res) => {
    try {
        const nuevaReservacion = await Reservacion.create(req.body);
        res.status(201).json(nuevaReservacion);
    } catch (error) {
        console.error('Error creating reservacion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateReservacion = async (req, res) => {
    try {
        const updatedReservacion = await Reservacion.update(req.params.id, req.body);
        if (!updatedReservacion) return res.status(404).json({ error: 'Reservacion not found' });
        res.status(200).json(updatedReservacion);
    } catch (error) {
        console.error('Error updating reservacion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteReservacion = async (req, res) => {
    try {
        const deletedReservacion = await Reservacion.delete(req.params.id);
        if (!deletedReservacion) return res.status(404).json({ error: 'Reservacion not found' });
        res.status(200).json({ message: 'Reservacion deleted successfully' });
    } catch (error) {
        console.error('Error deleting reservacion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllReservaciones, getReservacionById, createReservacion, updateReservacion, deleteReservacion };
