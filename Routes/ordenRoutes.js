const express = require('express');
const router = express.Router();
const ordenController = require('../Controller/ordenController');

router.get('/', ordenController.getAllOrdenes);
router.get('/:id', ordenController.getOrdenById);
router.post('/', ordenController.createOrdenConDetalle);

module.exports = router;
