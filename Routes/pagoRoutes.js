const express = require('express');
const router = express.Router();
const pagoController = require('../Controller/pagoController');

router.get('/', pagoController.getAllPagos);
router.get('/:id', pagoController.getPagoById);
router.post('/', pagoController.createPago);

module.exports = router;
