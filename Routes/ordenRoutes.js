const express = require('express');
const router = express.Router();
const ordenController = require('../Controller/ordenController');
const { verifyToken, checkRole } = require('../Middlewares/authMiddleware');

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
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Registrar una nueva Orden junto con sus Detalles
 *     tags: [Ordenes]
 *     security:
 *       - bearerAuth: []
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
router.get('/', verifyToken, checkRole(['MESERO', 'COCINA', 'CAJERO']), ordenController.getAllOrdenes);
router.post('/', verifyToken, checkRole(['MESERO']), ordenController.createOrdenConDetalle);

/**
 * @swagger
 * /api/ordenes/{id}:
 *   get:
 *     summary: Obtener orden por ID (incluye su detalle de platillos)
 *     tags: [Ordenes]
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
router.get('/:id', verifyToken, checkRole(['MESERO', 'COCINA', 'CAJERO']), ordenController.getOrdenById);

// Si hubiera un PUT para actualizar estado en este controlador, sería:
// router.put('/:id/estado', verifyToken, checkRole(['MESERO', 'COCINA']), ordenController.updateOrdenEstado);

module.exports = router;
