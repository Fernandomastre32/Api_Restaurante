const express = require('express');
const router = express.Router();
const reservacionController = require('../Controller/reservacionController');

/**
 * @swagger
 * tags:
 *   name: Reservaciones
 *   description: Manejo de reservaciones de clientes
 */

/**
 * @swagger
 * /api/reservaciones:
 *   get:
 *     summary: Obtener todas las reservaciones
 *     tags: [Reservaciones]
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Crear nueva reservacion
 *     tags: [Reservaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente_id:
 *                 type: integer
 *               mesa_id:
 *                 type: integer
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *               personas:
 *                 type: integer
 *               estado:
 *                 type: string
 *               notas:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reservacion creada
 */
router.get('/', reservacionController.getAllReservaciones);
router.post('/', reservacionController.createReservacion);

/**
 * @swagger
 * /api/reservaciones/{id}:
 *   get:
 *     summary: Obtener reservacion por ID
 *     tags: [Reservaciones]
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
 *         description: Reservacion no encontrada
 *   put:
 *     summary: Modificar reservacion
 *     tags: [Reservaciones]
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
 *               mesa_id:
 *                 type: integer
 *               fecha_hora:
 *                 type: string
 *                 format: date-time
 *               personas:
 *                 type: integer
 *               estado:
 *                 type: string
 *               notas:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reservacion actualizada
 *       404:
 *         description: Reservacion no encontrada
 *   delete:
 *     summary: Eliminar reservacion
 *     tags: [Reservaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reservacion borrada
 */
router.get('/:id', reservacionController.getReservacionById);
router.put('/:id', reservacionController.updateReservacion);
router.delete('/:id', reservacionController.deleteReservacion);

module.exports = router;
