const express = require('express');
const router = express.Router();
const insumoController = require('../Controller/insumoController');

router.get('/', insumoController.getAllInsumos);
router.get('/:id', insumoController.getInsumoById);
router.post('/', insumoController.createInsumo);
router.put('/:id', insumoController.updateInsumo);
router.delete('/:id', insumoController.deleteInsumo);

module.exports = router;
