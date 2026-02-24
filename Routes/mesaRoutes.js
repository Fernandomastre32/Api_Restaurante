const express = require('express');
const router = express.Router();
const mesaController = require('../Controller/mesaController');

/**
 * @swagger
 * tags:
 *   name: Mesas
 *   description: Catálogo y estados de mesas
 */

/**
 * @swagger
 * /api/mesas:
 *   get:
 *     summary: Obtener todas las mesas
 *     tags: [Mesas]
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Crear nueva mesa
 *     tags: [Mesas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               numero:
 *                 type: integer
 *               capacidad:
 *                 type: integer
 *               ubicacion:
 *                 type: string
 *                 example: SALON
 *               estado:
 *                 type: string
 *                 example: LIBRE
 *     responses:
 *       201:
 *         description: Mesa creada
 */
router.get('/', mesaController.getAllMesas);
router.post('/', mesaController.createMesa);

/**
 * @swagger
 * /api/mesas/{id}:
 *   get:
 *     summary: Obtener mesa por ID
 *     tags: [Mesas]
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
 *         description: Mesa no encontrada
 *   put:
 *     summary: Modificar mesa
 *     tags: [Mesas]
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
 *               numero:
 *                 type: integer
 *               capacidad:
 *                 type: integer
 *               ubicacion:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mesa actualizada
 *       404:
 *         description: Mesa no encontrada
 *   delete:
 *     summary: Eliminar mesa
 *     tags: [Mesas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Mesa borrada
 */
router.get('/:id', mesaController.getMesaById);
router.put('/:id', mesaController.updateMesa);
router.delete('/:id', mesaController.deleteMesa);

module.exports = router;
