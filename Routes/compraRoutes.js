const express = require('express');
const router = express.Router();
const compraController = require('../Controller/compraController');

router.get('/', compraController.getAllCompras);
router.get('/:id', compraController.getCompraById);
router.post('/', compraController.createCompraConDetalle);

module.exports = router;
