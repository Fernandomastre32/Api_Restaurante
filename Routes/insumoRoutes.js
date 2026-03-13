const express = require('express');
const router = express.Router();
const insumoController = require('../Controller/insumoController');
const { verifyToken, checkRole } = require('../Middlewares/authMiddleware');

/**
 * @swagger
 * tags:
 *   name: Insumos
 *   description: Catálogo de Insumos e inventarios
 */

/**
 * @swagger
 * /api/insumos:
 *   get:
 *     summary: Obtener todos los insumos
 *     tags: [Insumos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Crear nuevo insumo
 *     tags: [Insumos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               unidad:
 *                 type: string
 *                 example: KG
 *               stock_actual:
 *                 type: number
 *                 format: float
 *               stock_minimo:
 *                 type: number
 *                 format: float
 *               activo:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Insumo creado
 */
router.get('/', verifyToken, checkRole(['COCINA']), insumoController.getAllInsumos);
router.post('/', verifyToken, checkRole([]), insumoController.createInsumo);

/**
 * @swagger
 * /api/insumos/{id}:
 *   get:
 *     summary: Obtener insumo por ID
 *     tags: [Insumos]
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
 *         description: Insumo no encontrado
 *   put:
 *     summary: Modificar insumo
 *     tags: [Insumos]
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
 *               nombre:
 *                 type: string
 *               unidad:
 *                 type: string
 *               stock_actual:
 *                 type: number
 *                 format: float
 *               stock_minimo:
 *                 type: number
 *                 format: float
 *               activo:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Insumo actualizado
 *       404:
 *         description: Insumo no encontrado
 *   delete:
 *     summary: Eliminar insumo
 *     tags: [Insumos]
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
 *         description: Insumo borrado
 */
router.get('/:id', verifyToken, checkRole(['COCINA']), insumoController.getInsumoById);
router.put('/:id', verifyToken, checkRole([]), insumoController.updateInsumo);
router.delete('/:id', verifyToken, checkRole([]), insumoController.deleteInsumo);

module.exports = router;
