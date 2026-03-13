const express = require('express');
const router = express.Router();
const pagoController = require('../Controller/pagoController');
const { verifyToken, checkRole } = require('../Middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Pagos
 *   description: Registro de pagos y cierre de ordenes
 */

/**
 * @swagger
 * /api/pagos:
 *   get:
 *     summary: Obtener historial de todos los pagos
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Registrar nuevo pago (cierra la orden)
 *     tags: [Pagos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orden_id:
 *                 type: integer
 *               monto:
 *                 type: number
 *                 format: float
 *               metodo_pago:
 *                 type: string
 *                 example: TARJETA
 *     responses:
 *       201:
 *         description: Pago creado y orden cerrada
 *       400:
 *         description: Validacion fallida
 */
router.get('/', verifyToken, checkRole(['CAJERO']), pagoController.getAllPagos);
router.post('/', verifyToken, checkRole(['CAJERO']), pagoController.createPago);

/**
 * @swagger
 * /api/pagos/{id}:
 *   get:
 *     summary: Obtener pago por ID
 *     tags: [Pagos]
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
 */
router.get('/:id', verifyToken, checkRole(['CAJERO']), pagoController.getPagoById);

module.exports = router;
