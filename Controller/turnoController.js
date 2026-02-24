const Turno = require('../Models/turnoModel');

const getAllTurnos = async (req, res) => {
    try {
        const turnos = await Turno.getAll();
        res.status(200).json(turnos);
    } catch (error) {
        console.error('Error fetching turnos:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getTurnoById = async (req, res) => {
    try {
        const turno = await Turno.getById(req.params.id);
        if (!turno) return res.status(404).json({ error: 'Turno not found' });
        res.status(200).json(turno);
    } catch (error) {
        console.error('Error fetching turno:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createTurno = async (req, res) => {
    try {
        const nuevoTurno = await Turno.create(req.body);
        res.status(201).json(nuevoTurno);
    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'Turno already exists' });
        console.error('Error creating turno:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateTurno = async (req, res) => {
    try {
        const updatedTurno = await Turno.update(req.params.id, req.body);
        if (!updatedTurno) return res.status(404).json({ error: 'Turno not found' });
        res.status(200).json(updatedTurno);
    } catch (error) {
        console.error('Error updating turno:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteTurno = async (req, res) => {
    try {
        const deletedTurno = await Turno.delete(req.params.id);
        if (!deletedTurno) return res.status(404).json({ error: 'Turno not found' });
        res.status(200).json({ message: 'Turno deleted successfully' });
    } catch (error) {
        console.error('Error deleting turno:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllTurnos, getTurnoById, createTurno, updateTurno, deleteTurno };
