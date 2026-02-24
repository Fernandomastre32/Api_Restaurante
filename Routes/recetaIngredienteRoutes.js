const express = require('express');
const router = express.Router();
const recetaController = require('../Controller/recetaIngredienteController');

// We structure it specifically since it depends on platillo_id heavily
router.get('/platillo/:platilloId', recetaController.getIngredientesByPlatillo);
router.post('/', recetaController.addIngredienteToReceta);
router.delete('/:id', recetaController.removeIngredienteFromReceta);

module.exports = router;
