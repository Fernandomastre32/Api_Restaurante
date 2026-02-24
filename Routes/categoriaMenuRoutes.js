const express = require('express');
const router = express.Router();
const categoriaController = require('../Controller/categoriaMenuController');

/**
 * @swagger
 * tags:
 *   name: Categorias Menu
 *   description: Opciones de clasificacion de platillos
 */

/**
 * @swagger
 * /api/categorias:
 *   get:
 *     summary: Obtener todas las categorias
 *     tags: [Categorias Menu]
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Crear nueva categoria
 *     tags: [Categorias Menu]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Postres
 *     responses:
 *       201:
 *         description: Categoria creada
 */
router.get('/', categoriaController.getAllCategorias);
router.post('/', categoriaController.createCategoria);

/**
 * @swagger
 * /api/categorias/{id}:
 *   get:
 *     summary: Obtener categoria
 *     tags: [Categorias Menu]
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
 *         description: Categoria no encontrada
 *   put:
 *     summary: Modificar categoria
 *     tags: [Categorias Menu]
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
 *     responses:
 *       200:
 *         description: Categoria actualizada
 *       404:
 *         description: Categoria no encontrada
 *   delete:
 *     summary: Eliminar categoria
 *     tags: [Categorias Menu]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Categoria borrada
 */
router.get('/:id', categoriaController.getCategoriaById);
router.put('/:id', categoriaController.updateCategoria);
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;
