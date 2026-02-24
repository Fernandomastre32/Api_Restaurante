const express = require('express');
const router = express.Router();
const insumoController = require('../Controller/insumoController');

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
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Crear nuevo insumo
 *     tags: [Insumos]
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
router.get('/', insumoController.getAllInsumos);
router.post('/', insumoController.createInsumo);

/**
 * @swagger
 * /api/insumos/{id}:
 *   get:
 *     summary: Obtener insumo por ID
 *     tags: [Insumos]
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
router.get('/:id', insumoController.getInsumoById);
router.put('/:id', insumoController.updateInsumo);
router.delete('/:id', insumoController.deleteInsumo);

module.exports = router;
