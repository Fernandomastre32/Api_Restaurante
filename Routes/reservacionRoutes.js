const express = require('express');
const router = express.Router();
const reservacionController = require('../Controller/reservacionController');

router.get('/', reservacionController.getAllReservaciones);
router.get('/:id', reservacionController.getReservacionById);
router.post('/', reservacionController.createReservacion);
router.put('/:id', reservacionController.updateReservacion);
router.delete('/:id', reservacionController.deleteReservacion);

module.exports = router;
