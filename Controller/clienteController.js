const Cliente = require('../Models/clienteModel');

const getAllClientes = async (req, res) => {
    try {
        const clientes = await Cliente.getAll();
        res.status(200).json(clientes);
    } catch (error) {
        console.error('Error fetching clientes:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getClienteById = async (req, res) => {
    try {
        const cliente = await Cliente.getById(req.params.id);
        if (!cliente) return res.status(404).json({ error: 'Cliente not found' });
        res.status(200).json(cliente);
    } catch (error) {
        console.error('Error fetching cliente:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createCliente = async (req, res) => {
    try {
        const nuevoCliente = await Cliente.create(req.body);
        res.status(201).json(nuevoCliente);
    } catch (error) {
        console.error('Error creating cliente:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateCliente = async (req, res) => {
    try {
        const updatedCliente = await Cliente.update(req.params.id, req.body);
        if (!updatedCliente) return res.status(404).json({ error: 'Cliente not found' });
        res.status(200).json(updatedCliente);
    } catch (error) {
        console.error('Error updating cliente:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteCliente = async (req, res) => {
    try {
        const deletedCliente = await Cliente.delete(req.params.id);
        if (!deletedCliente) return res.status(404).json({ error: 'Cliente not found' });
        res.status(200).json({ message: 'Cliente deleted successfully' });
    } catch (error) {
        console.error('Error deleting cliente:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllClientes, getClienteById, createCliente, updateCliente, deleteCliente };
