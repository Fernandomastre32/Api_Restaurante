const express = require('express');
const router = express.Router();
const compraController = require('../Controller/compraController');
const { verifyToken, checkRole } = require('../Middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Compras
 *   description: Transacciones logicas de Compras a Proveedores
 */

/**
 * @swagger
 * /api/compras:
 *   get:
 *     summary: Obtener todas las compras
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Registrar una nueva Compra junto con sus insumos
 *     tags: [Compras]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proveedor_id:
 *                 type: integer
 *               comprador_id:
 *                 type: integer
 *               folio:
 *                 type: string
 *               estado:
 *                 type: string
 *                 example: RECIBIDA
 *               detalles:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     insumo_id:
 *                       type: integer
 *                     cantidad:
 *                       type: number
 *                     costo_unit:
 *                       type: number
 *     responses:
 *       201:
 *         description: Compra e insumos agregados, si recibida afecto inventario
 *       400:
 *         description: Faltan detalles
 */
router.get('/', verifyToken, checkRole(['CAJERO']), compraController.getAllCompras);
router.post('/', verifyToken, checkRole(['CAJERO']), compraController.createCompraConDetalle);

/**
 * @swagger
 * /api/compras/{id}:
 *   get:
 *     summary: Obtener Compra por ID (incluye sus insumos)
 *     tags: [Compras]
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
router.get('/:id', verifyToken, checkRole(['CAJERO']), compraController.getCompraById);

module.exports = router;
