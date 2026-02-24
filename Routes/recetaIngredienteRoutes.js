const express = require('express');
const router = express.Router();
const recetaController = require('../Controller/recetaIngredienteController');

/**
 * @swagger
 * tags:
 *   name: Recetas
 *   description: Agregado de insumos a platillos
 */

/**
 * @swagger
 * /api/recetas/platillo/{platilloId}:
 *   get:
 *     summary: Obtener ingredientes de un platillo específico
 *     tags: [Recetas]
 *     parameters:
 *       - in: path
 *         name: platilloId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de ingredientes devuelta
 */
router.get('/platillo/:platilloId', recetaController.getIngredientesByPlatillo);

/**
 * @swagger
 * /api/recetas:
 *   post:
 *     summary: Agregar ingrediente a platillo
 *     tags: [Recetas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               platillo_id:
 *                 type: integer
 *               insumo_id:
 *                 type: integer
 *               cantidad:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Ingrediente agregado
 */
router.post('/', recetaController.addIngredienteToReceta);

/**
 * @swagger
 * /api/recetas/{id}:
 *   delete:
 *     summary: Quitar ingrediente de receta (usando su receta_id)
 *     tags: [Recetas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ingrediente borrado de la receta
 */
router.delete('/:id', recetaController.removeIngredienteFromReceta);

module.exports = router;
