const { Router } = require('express');
const router = Router();
const mascotaController = require('../controllers/mascotaController');

/**
 * @swagger
 * /api/mascotas/all:
 *   get:
 *     tags:
 *       - Mascotas
 *     summary: Obtener todas las mascotas
 *     responses:
 *       200:
 *         description: Lista de todas las mascotas
 *       500:
 *         description: Error al obtener mascotas (Contactar equipo de API)
 */
router.get('/all', mascotaController.getAllMascotas);

/**
 * @swagger
 * /api/mascotas/id/{id}:
 *   get:
 *     tags:
 *       - Mascotas
 *     summary: Obtener una mascota por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: int
 *         required: true
 *         description: ID de la mascota
 *     responses:
 *       200:
 *         description: Mascota obtenida exitosamente
 *       404:
 *         description: Mascota no encontrada
 *       500:
 *         description: Error interno del servidor (Contactar equipo de API)
 */
router.get('/id/:id', mascotaController.getMascota);

/**
 * @swagger
 * /api/mascotas:
 *   post:
 *     tags:
 *       - Mascotas
 *     summary: Insertar una nueva mascota
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idFamilia
 *               - tipo
 *               - tamaño
 *               - nombreMascota
 *             properties:
 *               idFamilia:
 *                 type: int
 *               tipo:
 *                 type: string
 *               tamaño:
 *                 type: string
 *               nombreMascota:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mascota insertada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al insertar mascota (Contactar equipo de API)
 */
router.post('/', mascotaController.postMascota);

/**
 * @swagger
 * /api/mascotas:
 *   put:
 *     tags:
 *       - Mascotas
 *     summary: Actualizar una mascota existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - idFamilia
 *               - tipo
 *               - tamaño
 *               - nombreMascota
 *             properties:
 *               id:
 *                 type: int
 *               idFamilia:
 *                 type: int
 *               tipo:
 *                 type: string
 *               tamaño:
 *                 type: string
 *               nombreMascota:
 *                 type: string
 *     responses:
 *       200:
 *         description: Mascota actualizada correctamente
 *       400:
 *         description: Datos faltantes en el cuerpo de la solicitud
 *       500:
 *         description: Error al actualizar mascota (Contactar equipo de API)
 */
// router.put('/', putMethod);

/**
 * @swagger
 * /api/mascotas/id/{id}:
 *   delete:
 *     tags:
 *       - Mascotas
 *     summary: Eliminar una mascota por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: int
 *         required: true
 *         description: ID de la mascota a eliminar
 *     responses:
 *       200:
 *         description: Mascota eliminada correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar la mascota (Contactar equipo de API)
 */
router.delete('/id/:id', mascotaController.deleteMascota);

/**
 * @swagger
 * /api/mascotas/consulta/familia/{codigoFamilia}:
 *   get:
 *     summary: Obtener mascotas por código de familia
 *     tags:
 *       - Mascotas
 *     parameters:
 *       - in: path
 *         name: codigoFamilia
 *         required: true
 *         description: Código de la familia a consultar (debe coincidir con el valor en la base de datos)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Mascotas obtenidas exitosamente
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
 *                   example: Lista de mascotas obtenida
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       tipo:
 *                         type: string
 *                         example: Perro
 *                       tamaño:
 *                         type: string
 *                         example: Mediano
 *                       nombreMascota:
 *                         type: string
 *                         example: Rocky
 *                       codigoFamilia:
 *                         type: string
 *                         example: FAM123
 *                       cantidadPersonas:
 *                         type: integer
 *                         example: 4
 *                       idAlbergue:
 *                         type: integer
 *                         example: 2
 *       404:
 *         description: No se encontraron mascotas para el código de familia especificado
 *       500:
 *         description: Error al obtener las mascotas (Contactar al equipo de API)
 */
router.get('/consulta/familia/:codigoFamilia', mascotaController.getForMascotaFamilia);

module.exports = router;