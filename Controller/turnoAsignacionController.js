const TurnoAsignacion = require('../Models/turnoAsignacionModel');

const getAllAsignaciones = async (req, res) => {
    try {
        const asignaciones = await TurnoAsignacion.getAll();
        res.status(200).json(asignaciones);
    } catch (error) {
        console.error('Error fetching turno asignaciones:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAsignacionById = async (req, res) => {
    try {
        const asignacion = await TurnoAsignacion.getById(req.params.id);
        if (!asignacion) return res.status(404).json({ error: 'Asignacion not found' });
        res.status(200).json(asignacion);
    } catch (error) {
        console.error('Error fetching turno asignacion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createAsignacion = async (req, res) => {
    try {
        const nuevaAsignacion = await TurnoAsignacion.create(req.body);
        res.status(201).json(nuevaAsignacion);
    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'Empleado already assigned to this turno on this date' });
        console.error('Error creating turno asignacion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateAsignacion = async (req, res) => {
    try {
        const updatedAsignacion = await TurnoAsignacion.update(req.params.id, req.body);
        if (!updatedAsignacion) return res.status(404).json({ error: 'Asignacion not found' });
        res.status(200).json(updatedAsignacion);
    } catch (error) {
        console.error('Error updating turno asignacion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteAsignacion = async (req, res) => {
    try {
        const deletedAsignacion = await TurnoAsignacion.delete(req.params.id);
        if (!deletedAsignacion) return res.status(404).json({ error: 'Asignacion not found' });
        res.status(200).json({ message: 'Asignacion deleted successfully' });
    } catch (error) {
        console.error('Error deleting turno asignacion:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllAsignaciones, getAsignacionById, createAsignacion, updateAsignacion, deleteAsignacion };
