const express = require('express');
const router = express.Router();
const { putContrasenaMethod, validarCorreoMethod } = require('../controllers/usuarioController');

/**
 * @swagger
 * /api/public/usuarios/contrasena:
 *   put:
 *     tags:
 *       - Usuarios Públicos
 *     summary: Actualizar la contraseña de un usuario
 *     security: []  # Indica que no requiere autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - nuevaContrasena
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *               nuevaContrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Contraseña actualizada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar contraseña (Contactar equipo de API)
 */
router.put('/usuarios/contrasena', putContrasenaMethod);

/**
 * @swagger
 * /api/public/usuarios/validar/correo:
 *   post:
 *     tags:
 *       - Usuarios Públicos
 *     summary: Validar si el correo ya está en uso
 *     security: []  # Indica que no requiere autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *     responses:
 *       200:
 *         description: Correo válido y disponible
 *       400:
 *         description: Correo ya en uso
 *       500:
 *         description: Error al validar correo (Contactar equipo de API)
 */
router.post('/usuarios/validar/correo', validarCorreoMethod);

module.exports = router;