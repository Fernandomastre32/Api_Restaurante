const Proveedor = require('../Models/proveedorModel');

const getAllProveedores = async (req, res) => {
    try {
        const proveedores = await Proveedor.getAll();
        res.status(200).json(proveedores);
    } catch (error) {
        console.error('Error fetching proveedores:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getProveedorById = async (req, res) => {
    try {
        const proveedor = await Proveedor.getById(req.params.id);
        if (!proveedor) return res.status(404).json({ error: 'Proveedor not found' });
        res.status(200).json(proveedor);
    } catch (error) {
        console.error('Error fetching proveedor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createProveedor = async (req, res) => {
    try {
        const nuevoProveedor = await Proveedor.create(req.body);
        res.status(201).json(nuevoProveedor);
    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'Proveedor already exists' });
        console.error('Error creating proveedor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateProveedor = async (req, res) => {
    try {
        const updatedProveedor = await Proveedor.update(req.params.id, req.body);
        if (!updatedProveedor) return res.status(404).json({ error: 'Proveedor not found' });
        res.status(200).json(updatedProveedor);
    } catch (error) {
        console.error('Error updating proveedor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteProveedor = async (req, res) => {
    try {
        const deletedProveedor = await Proveedor.delete(req.params.id);
        if (!deletedProveedor) return res.status(404).json({ error: 'Proveedor not found' });
        res.status(200).json({ message: 'Proveedor deleted successfully' });
    } catch (error) {
        console.error('Error deleting proveedor:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllProveedores, getProveedorById, createProveedor, updateProveedor, deleteProveedor };
