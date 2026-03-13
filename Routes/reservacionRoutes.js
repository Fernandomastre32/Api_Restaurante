const express = require('express');
const router = express.Router();
const reservacionController = require('../Controller/reservacionController');
const { verifyToken, checkRole } = require('../Middlewares/authMiddleware');

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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Crear nueva reservacion
 *     tags: [Reservaciones]
 *     security:
 *       - bearerAuth: []
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
router.get('/', verifyToken, checkRole(['RECEPCIONISTA']), reservacionController.getAllReservaciones);
router.post('/', verifyToken, checkRole(['RECEPCIONISTA']), reservacionController.createReservacion);

/**
 * @swagger
 * /api/reservaciones/{id}:
 *   get:
 *     summary: Obtener reservacion por ID
 *     tags: [Reservaciones]
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
 *     security:
 *       - bearerAuth: []
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
router.get('/:id', verifyToken, checkRole(['RECEPCIONISTA']), reservacionController.getReservacionById);
router.put('/:id', verifyToken, checkRole(['RECEPCIONISTA']), reservacionController.updateReservacion);
router.delete('/:id', verifyToken, checkRole([]), reservacionController.deleteReservacion);

module.exports = router;
