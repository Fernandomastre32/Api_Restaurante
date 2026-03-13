const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autenticación de usuarios para obtener Token JWT
 */

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesión y obtener un Token JWT
 *     tags: [Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: jperez@restaurante.com
 *               password:
 *                 type: string
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Autenticación exitosa, retorna Token JWT
 *       401:
 *         description: Credenciales inválidas
 */
router.post('/login', authController.login);

module.exports = router;
