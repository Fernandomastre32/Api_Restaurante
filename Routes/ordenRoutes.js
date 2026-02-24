const express = require('express');
const router = express.Router();
const ordenController = require('../Controller/ordenController');

/**
 * @swagger
 * tags:
 *   name: Ordenes
 *   description: Transacciones logicas de Ordenes de ventas
 */

/**
 * @swagger
 * /api/ordenes:
 *   get:
 *     summary: Obtener todas las ordenes
 *     tags: [Ordenes]
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Registrar una nueva Orden junto con sus Detalles
 *     tags: [Ordenes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mesa_id:
 *                 type: integer
 *               mesero_id:
 *                 type: integer
 *               cliente_id:
 *                 type: integer
 *                 nullable: true
 *               estado:
 *                 type: string
 *                 example: PENDIENTE
 *               detalles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     platillo_id:
 *                       type: integer
 *                     cantidad:
 *                       type: integer
 *                     notas:
 *                       type: string
 *     responses:
 *       201:
 *         description: Orden y Detalles registrados, mesa abierta exitosamente
 *       400:
 *         description: Faltan detalles de platillos
 */
router.get('/', ordenController.getAllOrdenes);
router.post('/', ordenController.createOrdenConDetalle);

/**
 * @swagger
 * /api/ordenes/{id}:
 *   get:
 *     summary: Obtener orden por ID (incluye su detalle de platillos)
 *     tags: [Ordenes]
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
router.get('/:id', ordenController.getOrdenById);

module.exports = router;
