const express = require('express');
const router = express.Router();
const inventarioController = require('../Controller/inventarioMovimientoController');

router.get('/', inventarioController.getAllMovimientos);
router.get('/:id', inventarioController.getMovimientoById);
router.post('/', inventarioController.createMovimiento);

module.exports = router;
