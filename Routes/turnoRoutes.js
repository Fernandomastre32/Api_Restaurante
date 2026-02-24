const express = require('express');
const router = express.Router();
const turnoController = require('../Controller/turnoController');

/**
 * @swagger
 * tags:
 *   name: Turnos
 *   description: Catálogo de turnos operativos
 */

/**
 * @swagger
 * /api/turnos:
 *   get:
 *     summary: Obtener todos los turnos
 *     tags: [Turnos]
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Crear nuevo turno
 *     tags: [Turnos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: MATUTINO
 *               hora_inicio:
 *                 type: string
 *                 example: "08:00:00"
 *               hora_fin:
 *                 type: string
 *                 example: "16:00:00"
 *     responses:
 *       201:
 *         description: Turno creado
 */
router.get('/', turnoController.getAllTurnos);
router.post('/', turnoController.createTurno);

/**
 * @swagger
 * /api/turnos/{id}:
 *   get:
 *     summary: Obtener turno
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos devueltos
 *       404:
 *         description: Turno no encontrado
 *   put:
 *     summary: Modificar turno
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               hora_inicio:
 *                 type: string
 *               hora_fin:
 *                 type: string
 *     responses:
 *       200:
 *         description: Turno actualizado
 *       404:
 *         description: Turno no encontrado
 *   delete:
 *     summary: Eliminar turno
 *     tags: [Turnos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Turno borrado
 */
router.get('/:id', turnoController.getTurnoById);
router.put('/:id', turnoController.updateTurno);
router.delete('/:id', turnoController.deleteTurno);

module.exports = router;
