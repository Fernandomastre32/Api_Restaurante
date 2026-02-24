const RecetaIngrediente = require('../Models/recetaIngredienteModel');

const getIngredientesByPlatillo = async (req, res) => {
    try {
        const ingredientes = await RecetaIngrediente.getByPlatillo(req.params.platilloId);
        res.status(200).json(ingredientes);
    } catch (error) {
        console.error('Error fetching ingredientes de receta:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const addIngredienteToReceta = async (req, res) => {
    try {
        const { platillo_id, insumo_id, cantidad } = req.body;
        if (!platillo_id || !insumo_id || !cantidad) {
            return res.status(400).json({ error: 'Faltan datos requeridos (platillo_id, insumo_id, cantidad)' });
        }
        const nuevoIngrediente = await RecetaIngrediente.create(req.body);
        res.status(201).json(nuevoIngrediente);
    } catch (error) {
        if (error.code === '23505') return res.status(409).json({ error: 'Ingrediente ya existe en esta receta' });
        console.error('Error adding ingrediente a receta:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const removeIngredienteFromReceta = async (req, res) => {
    try {
        const deletedIngrediente = await RecetaIngrediente.delete(req.params.id);
        if (!deletedIngrediente) return res.status(404).json({ error: 'Ingrediente no encontrado en receta' });
        res.status(200).json({ message: 'Ingrediente eliminado de la receta exitosamente' });
    } catch (error) {
        console.error('Error removing ingrediente de receta:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getIngredientesByPlatillo, addIngredienteToReceta, removeIngredienteFromReceta };
