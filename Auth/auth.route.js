const { Router } = require('express');
const AuthController = require('./auth.controller');
const authMiddleware = require('../middleware/authMiddleware.js');
const router = Router();

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Iniciar sesión con correo/usuario y contraseña
 *     description: Permite login usando correo electrónico O nombre de usuario junto con la contraseña
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - contrasena
 *             properties:
 *               correo:
 *                 type: string
 *                 format: email
 *                 example: usuario@email.com
 *                 description: Correo electrónico del usuario (requerido si no se envía 'usuario')
 *               usuario:
 *                 type: string
 *                 example: miUsuario123
 *                 description: Nombre de usuario (requerido si no se envía 'correo')
 *               contrasena:
 *                 type: string
 *                 example: "miContrasena123"
 *                 description: Contraseña del usuario
 *           examples:
 *             loginPorCorreo:
 *               summary: Login con correo electrónico
 *               value:
 *                 correo: "usuario@example.com"
 *                 contrasena: "miContrasena123"
 *             loginPorUsuario:
 *               summary: Login con nombre de usuario
 *               value:
 *                 usuario: "miUsuario123"
 *                 contrasena: "miContrasena123"
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Login exitoso"
 *                 accessToken:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nombreUsuario:
 *                       type: string
 *                       example: "miUsuario123"
 *                     correo:
 *                       type: string
 *                       example: "usuario@example.com"
 *                     rol:
 *                       type: string
 *                       example: "usuario"
 *                     idMunicipalidad:
 *                       type: integer
 *                       nullable: true
 *                       example: 1
 *       400:
 *         description: Correo/usuario o contraseña faltante
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Correo/usuario y contraseña son requeridos"
 *       401:
 *         description: Usuario no encontrado o contraseña incorrecta
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Credenciales inválidas"
 *       500:
 *         description: Error interno del servidor
 */
router.post('/login', AuthController.login);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     tags:
 *       - Autenticación
 *     summary: Cerrar sesión del usuario
 *     description: Elimina la cookie de autenticación y cierra la sesión del usuario
 *     responses:
 *       200:
 *         description: Sesión cerrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Sesión cerrada exitosamente"
 *       500:
 *         description: Error interno del servidor
 */
router.post('/logout', AuthController.logout);

/**
 * @swagger
 * /api/auth/validate:
 *   get:
 *     tags:
 *       - Autenticación
 *     summary: Verificar validez de token JWT
 *     description: Valida el token desde cookie o header Authorization
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token válido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: "Token válido"
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     correo:
 *                       type: string
 *                       example: "usuario@example.com"
 *                     rol:
 *                       type: string
 *                       example: "usuario"
 *                     idMunicipalidad:
 *                       type: integer
 *                       nullable: true
 *                       example: 1
 *       401:
 *         description: Token inválido, expirado o no proporcionado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Token expirado"
 */
router.get('/validate', authMiddleware, AuthController.validateToken)

module.exports = router;