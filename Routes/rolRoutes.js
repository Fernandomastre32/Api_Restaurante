const express = require('express');
const router = express.Router();
const rolController = require('../Controller/rolController');

router.get('/', rolController.getAllRoles);
router.get('/:id', rolController.getRoleById);
router.post('/', rolController.createRole);
router.put('/:id', rolController.updateRole);
router.delete('/:id', rolController.deleteRole);

module.exports = router;
