const Empleado = require('../Models/empleadoModel');

const getAllEmpleados = async (req, res) => {
    try {
        const empleados = await Empleado.getAll();
        res.status(200).json(empleados);
    } catch (error) {
        console.error('Error fetching empleados:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getEmpleadoById = async (req, res) => {
    try {
        const empleado = await Empleado.getById(req.params.id);
        if (!empleado) {
            return res.status(404).json({ error: 'Empleado not found' });
        }
        res.status(200).json(empleado);
    } catch (error) {
        console.error('Error fetching empleado:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createEmpleado = async (req, res) => {
    try {
        const newEmpleado = await Empleado.create(req.body);
        res.status(201).json(newEmpleado);
    } catch (error) {
        console.error('Error creating empleado:', error);
        if (error.code === '23505') { // postgres unique violation
            return res.status(409).json({ error: 'Email already exists' });
        }
        if (error.code === '23503') { // foreign key violation
            return res.status(400).json({ error: 'Invalid rol_id' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateEmpleado = async (req, res) => {
    try {
        const updatedEmpleado = await Empleado.update(req.params.id, req.body);
        if (!updatedEmpleado) {
            return res.status(404).json({ error: 'Empleado not found' });
        }
        res.status(200).json(updatedEmpleado);
    } catch (error) {
        console.error('Error updating empleado:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteEmpleado = async (req, res) => {
    try {
        const deletedEmpleado = await Empleado.delete(req.params.id);
        if (!deletedEmpleado) {
            return res.status(404).json({ error: 'Empleado not found' });
        }
        res.status(200).json({ message: 'Empleado deleted successfully' });
    } catch (error) {
        console.error('Error deleting empleado:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllEmpleados,
    getEmpleadoById,
    createEmpleado,
    updateEmpleado,
    deleteEmpleado
};
