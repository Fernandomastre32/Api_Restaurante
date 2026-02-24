const CategoriaMenu = require('../Models/categoriaMenuModel');

const getAllCategorias = async (req, res) => {
    try {
        const categorias = await CategoriaMenu.getAll();
        res.status(200).json(categorias);
    } catch (error) {
        console.error('Error fetching categorias:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getCategoriaById = async (req, res) => {
    try {
        const categoria = await CategoriaMenu.getById(req.params.id);
        if (!categoria) return res.status(404).json({ error: 'Categoria not found' });
        res.status(200).json(categoria);
    } catch (error) {
        console.error('Error fetching categoria:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const createCategoria = async (req, res) => {
    try {
        const nuevaCategoria = await CategoriaMenu.create(req.body);
        res.status(201).json(nuevaCategoria);
    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'Categoria nombre already exists' });
        console.error('Error creating categoria:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const updateCategoria = async (req, res) => {
    try {
        const updatedCategoria = await CategoriaMenu.update(req.params.id, req.body);
        if (!updatedCategoria) return res.status(404).json({ error: 'Categoria not found' });
        res.status(200).json(updatedCategoria);
    } catch (error) {
        console.error('Error updating categoria:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const deleteCategoria = async (req, res) => {
    try {
        const deletedCategoria = await CategoriaMenu.delete(req.params.id);
        if (!deletedCategoria) return res.status(404).json({ error: 'Categoria not found' });
        res.status(200).json({ message: 'Categoria deleted successfully' });
    } catch (error) {
        console.error('Error deleting categoria:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getAllCategorias, getCategoriaById, createCategoria, updateCategoria, deleteCategoria };
