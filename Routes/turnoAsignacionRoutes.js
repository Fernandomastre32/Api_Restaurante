const express = require('express');
const router = express.Router();
const turnoAsignacionController = require('../Controller/turnoAsignacionController');

router.get('/', turnoAsignacionController.getAllAsignaciones);
router.get('/:id', turnoAsignacionController.getAsignacionById);
router.post('/', turnoAsignacionController.createAsignacion);
router.put('/:id', turnoAsignacionController.updateAsignacion);
router.delete('/:id', turnoAsignacionController.deleteAsignacion);

module.exports = router;
