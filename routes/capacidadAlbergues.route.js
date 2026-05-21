const { Router } = require('express');
const router = Router();
const albergueController = require('../controllers/capacidadAlberguesController');

/**
 * @swagger
 * /api/capacidadAlbergues/id/{id}:
 *   get:
 *     tags:
 *       - Capacidad Albergues
 *     summary: Obtener capacidad de albergue por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la capacidad
 *     responses:
 *       200:
 *         description: Registro obtenido exitosamente
 *       404:
 *         description: Registro no encontrado
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id', albergueController.getCapacidadAlbergue);

/**
 * @swagger
 * /api/capacidadAlbergues/all:
 *   get:
 *     tags:
 *       - Capacidad Albergues
 *     summary: Obtener todas las capacidades de albergues
 *     responses:
 *       200:
 *         description: Lista de capacidades obtenida correctamente
 *       500:
 *         description: Error al obtener las capacidades (Contactar equipo de API)
 */
router.get('/all', albergueController.getAllCapacidadAlbergue);

/**
 * @swagger
 * /api/capacidadAlbergue:
 *   post:
 *     tags:
 *       - Capacidad Albergues
 *     summary: Insertar un nuevo registro de capacidad de albergue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - capacidadPersonas
 *               - capacidadColectiva
 *               - cantidadFamilias
 *               - ocupacion
 *               - egresos
 *             properties:
 *               idAlbergue:
 *                 type: integer
 *                 nullable: true
 *               capacidadPersonas:
 *                 type: integer
 *               capacidadColectiva:
 *                 type: integer
 *               cantidadFamilias:
 *                 type: integer
 *               ocupacion:
 *                 type: integer
 *               egresos:
 *                 type: integer
 *               sospechososSanos:
 *                 type: integer
 *                 nullable: true
 *               otros:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Registro creado correctamente
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error al crear registro (Contactar equipo de API)
 */
router.post('/', albergueController.postCapacidadAlbergue);

/**
 * @swagger
 * /api/capacidadAlbergues:
 *   put:
 *     tags:
 *       - Capacidad Albergues
 *     summary: Actualizar capacidad de albergue existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - capacidad_personas
 *               - capacidad_colectiva
 *               - cantidad_familias
 *               - ocupacion
 *               - egresos
 *               - sospechosos_sanos
 *             properties:
 *               id:
 *                 type: integer
 *               capacidad_personas:
 *                 type: integer
 *               capacidad_colectiva:
 *                 type: integer
 *               cantidad_familias:
 *                 type: integer
 *               ocupacion:
 *                 type: integer
 *               egresos:
 *                 type: integer
 *               sospechosos_sanos:
 *                 type: integer
 *               otros:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro actualizado correctamente
 *       400:
 *         description: Faltan campos obligatorios
 *       500:
 *         description: Error al actualizar el registro (Contactar equipo de API)
 */
router.put('/', albergueController.putCapacidadAlbergue);

/**
 * @swagger
 * /api/capacidadAlbergues/id/{id}:
 *   delete:
 *     tags:
 *       - Capacidad Albergues
 *     summary: Eliminar una capacidad de albergue por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la capacidad a eliminar
 *     responses:
 *       200:
 *         description: Registro eliminado correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar el registro (Contactar equipo de API)
 */
router.delete('/id/:id', albergueController.deleteCapacidadAlbergue);

module.exports = router;