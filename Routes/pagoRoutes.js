const express = require('express');
const router = express.Router();
const pagoController = require('../Controller/pagoController');

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
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Registrar nuevo pago (cierra la orden)
 *     tags: [Pagos]
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
router.get('/', pagoController.getAllPagos);
router.post('/', pagoController.createPago);

/**
 * @swagger
 * /api/pagos/{id}:
 *   get:
 *     summary: Obtener pago por ID
 *     tags: [Pagos]
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
router.get('/:id', pagoController.getPagoById);

module.exports = router;
