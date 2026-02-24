const Rol = require('../Models/rolModel');

const getAllRoles = async (req, res) => {
    try {
        const roles = await Rol.getAll();
        res.status(200).json(roles);
    } catch (error) {
        console.error('Error fetching roles:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getRoleById = async (req, res) => {
    try {
        const rol = await Rol.getById(req.params.id);
        if (!rol) {
            return res.status(404).json({ error: 'Rol not found' });
        }
        res.status(200).json(rol);
    } catch (error) {
        console.error('Error fetching role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createRole = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        if (!nombre) {
            return res.status(400).json({ error: 'Nombre is required' });
        }
        const newRol = await Rol.create({ nombre, descripcion });
        res.status(201).json(newRol);
    } catch (error) {
        console.error('Error creating role:', error);
        if (error.code === '23505') { // postgres unique violation
            return res.status(409).json({ error: 'Rol already exists' });
        }
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateRole = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const updatedRol = await Rol.update(req.params.id, { nombre, descripcion });
        if (!updatedRol) {
            return res.status(404).json({ error: 'Rol not found' });
        }
        res.status(200).json(updatedRol);
    } catch (error) {
        console.error('Error updating role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteRole = async (req, res) => {
    try {
        const deletedRol = await Rol.delete(req.params.id);
        if (!deletedRol) {
            return res.status(404).json({ error: 'Rol not found' });
        }
        res.status(200).json({ message: 'Rol deleted successfully' });
    } catch (error) {
        console.error('Error deleting role:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    getAllRoles,
    getRoleById,
    createRole,
    updateRole,
    deleteRole
};
