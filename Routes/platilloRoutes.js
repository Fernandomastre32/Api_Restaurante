const express = require('express');
const router = express.Router();
const platilloController = require('../Controller/platilloController');

router.get('/', platilloController.getAllPlatillos);
router.get('/:id', platilloController.getPlatilloById);
router.post('/', platilloController.createPlatillo);
router.put('/:id', platilloController.updatePlatillo);
router.delete('/:id', platilloController.deletePlatillo);

module.exports = router;
