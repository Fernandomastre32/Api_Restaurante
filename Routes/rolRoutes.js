const express = require('express');
const router = express.Router();
const rolController = require('../Controller/rolController');

/**
 * @swagger
 * tags:
 *   name: Roles
 *   description: Administración de roles de empleados
 */

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Obtener todos los roles
 *     tags: [Roles]
 *     responses:
 *       200:
 *         description: Lista de roles obtenida exitosamente
 *   post:
 *     summary: Crear un nuevo rol
 *     tags: [Roles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: CAJERO
 *               descripcion:
 *                 type: string
 *                 example: Persona encargada de los cobros en caja
 *     responses:
 *       201:
 *         description: Rol creado exitosamente
 *       400:
 *         description: Datos requeridos faltantes
 *       409:
 *         description: El nombre del rol ya existe
 */
router.get('/', rolController.getAllRoles);
router.post('/', rolController.createRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Obtener un rol por su ID
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Objeto del Rol
 *       404:
 *         description: Rol no encontrado
 *   put:
 *     summary: Actualizar un rol existente
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del rol a editar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rol modificado exitosamente
 *       404:
 *         description: Rol no encontrado
 *   delete:
 *     summary: Eliminar un rol
 *     tags: [Roles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado exitosamente
 *       404:
 *         description: Rol no encontrado
 */
router.get('/:id', rolController.getRoleById);
router.put('/:id', rolController.updateRole);
router.delete('/:id', rolController.deleteRole);

module.exports = router;
