const express = require('express');
const router = express.Router();
const mesaController = require('../Controller/mesaController');

router.get('/', mesaController.getAllMesas);
router.get('/:id', mesaController.getMesaById);
router.post('/', mesaController.createMesa);
router.put('/:id', mesaController.updateMesa);
router.delete('/:id', mesaController.deleteMesa);

module.exports = router;
