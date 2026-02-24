const express = require('express');
const router = express.Router();
const turnoAsignacionController = require('../Controller/turnoAsignacionController');

/**
 * @swagger
 * tags:
 *   name: Turno Asignacion
 *   description: Relacion de turnos contra empleados
 */

/**
 * @swagger
 * /api/turno-asignacion:
 *   get:
 *     summary: Obtener todo el historial de asignaciones
 *     tags: [Turno Asignacion]
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Asignar turno a empleado
 *     tags: [Turno Asignacion]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               turno_id:
 *                 type: integer
 *               empleado_id:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *                 example: 2026-03-01
 *     responses:
 *       201:
 *         description: Asignacion creada
 *       409:
 *         description: Empleado ya asignado ese turno en tal fecha
 */
router.get('/', turnoAsignacionController.getAllAsignaciones);
router.post('/', turnoAsignacionController.createAsignacion);

/**
 * @swagger
 * /api/turno-asignacion/{id}:
 *   get:
 *     summary: Obtener asignacion por ID
 *     tags: [Turno Asignacion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Datos devueltos
 *   put:
 *     summary: Modificar asignacion
 *     tags: [Turno Asignacion]
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
 *               turno_id:
 *                 type: integer
 *               empleado_id:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Asignacion actualizada
 *   delete:
 *     summary: Eliminar asignacion
 *     tags: [Turno Asignacion]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Asignacion borrada
 */
router.get('/:id', turnoAsignacionController.getAsignacionById);
router.put('/:id', turnoAsignacionController.updateAsignacion);
router.delete('/:id', turnoAsignacionController.deleteAsignacion);

module.exports = router;
