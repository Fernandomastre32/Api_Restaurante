const express = require('express');
const router = express.Router();
const inventarioController = require('../Controller/inventarioMovimientoController');

/**
 * @swagger
 * tags:
 *   name: Inventario (Movimientos)
 *   description: Consultar entradas y salidas de inventario
 */

/**
 * @swagger
 * /api/inventario:
 *   get:
 *     summary: Obtener todo el historial de movimientos
 *     tags: [Inventario (Movimientos)]
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Generar movimiento manual
 *     tags: [Inventario (Movimientos)]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               insumo_id:
 *                 type: integer
 *               usuario_id:
 *                 type: integer
 *               tipo_movimiento:
 *                 type: string
 *                 example: ENTRADA
 *               cantidad:
 *                 type: number
 *                 format: float
 *               motivo:
 *                 type: string
 *                 example: Ajuste de inventario
 *     responses:
 *       201:
 *         description: Movimiento creado
 */
router.get('/', inventarioController.getAllMovimientos);
router.post('/', inventarioController.createMovimiento);

/**
 * @swagger
 * /api/inventario/{id}:
 *   get:
 *     summary: Obtener detalle de movimiento
 *     tags: [Inventario (Movimientos)]
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
router.get('/:id', inventarioController.getMovimientoById);

module.exports = router;
