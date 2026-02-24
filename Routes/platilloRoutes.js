const express = require('express');
const router = express.Router();
const platilloController = require('../Controller/platilloController');

/**
 * @swagger
 * tags:
 *   name: Platillos
 *   description: Catálogo de Platillos del restaurante
 */

/**
 * @swagger
 * /api/platillos:
 *   get:
 *     summary: Obtener todos los platillos
 *     tags: [Platillos]
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Crear nuevo platillo
 *     tags: [Platillos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoria_id:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *                 format: float
 *               disponible:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Platillo creado
 */
router.get('/', platilloController.getAllPlatillos);
router.post('/', platilloController.createPlatillo);

/**
 * @swagger
 * /api/platillos/{id}:
 *   get:
 *     summary: Obtener platillo por ID
 *     tags: [Platillos]
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
 *         description: Platillo no encontrado
 *   put:
 *     summary: Modificar platillo
 *     tags: [Platillos]
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
 *               categoria_id:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               precio:
 *                 type: number
 *                 format: float
 *               disponible:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Platillo actualizado
 *       404:
 *         description: Platillo no encontrado
 *   delete:
 *     summary: Eliminar platillo
 *     tags: [Platillos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Platillo borrado
 */
router.get('/:id', platilloController.getPlatilloById);
router.put('/:id', platilloController.updatePlatillo);
router.delete('/:id', platilloController.deletePlatillo);

module.exports = router;
