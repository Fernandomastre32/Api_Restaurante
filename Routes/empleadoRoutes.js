const express = require('express');
const router = express.Router();
const empleadoController = require('../Controller/empleadoController');

/**
 * @swagger
 * tags:
 *   name: Empleados
 *   description: Gestión de empleados y su información
 */

/**
 * @swagger
 * /api/empleados:
 *   get:
 *     summary: Obtener lista completa de empleados
 *     tags: [Empleados]
 *     responses:
 *       200:
 *         description: Lista devuelta
 *   post:
 *     summary: Registrar a un nuevo empleado
 *     tags: [Empleados]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan
 *               apellido_p:
 *                 type: string
 *                 example: Perez
 *               apellido_m:
 *                 type: string
 *                 example: Rodriguez
 *               telefono:
 *                 type: string
 *                 example: "5551234567"
 *               email:
 *                 type: string
 *                 example: jperez@restaurante.com
 *               activo:
 *                 type: boolean
 *                 example: true
 *               rol_id:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       201:
 *         description: Empleado creado exitosamente
 *       400:
 *         description: Llave foránea de rol inválida
 *       409:
 *         description: Email ya registrado
 */
router.get('/', empleadoController.getAllEmpleados);
router.post('/', empleadoController.createEmpleado);

/**
 * @swagger
 * /api/empleados/{id}:
 *   get:
 *     summary: Ver detalles de un empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Objeto Empleado devuelto
 *       404:
 *         description: Empleado no encontrado
 *   put:
 *     summary: Actualizar empleado
 *     tags: [Empleados]
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
 *               apellido_p:
 *                 type: string
 *               apellido_m:
 *                 type: string
 *               telefono:
 *                 type: string
 *               email:
 *                 type: string
 *               activo:
 *                 type: boolean
 *               rol_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Empleado actualizado
 *       404:
 *         description: Empleado no encontrado
 *   delete:
 *     summary: Borrar empleado
 *     tags: [Empleados]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Borrado correcto
 */
router.get('/:id', empleadoController.getEmpleadoById);
router.put('/:id', empleadoController.updateEmpleado);
router.delete('/:id', empleadoController.deleteEmpleado);

module.exports = router;
