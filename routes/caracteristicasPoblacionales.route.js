const { Router } = require('express');
const router = Router();
const caracteristicasPoblacionalesController = require('../controllers/caracteristicasPoblacionalesController');

/**
 * @swagger
 * /api/caracteristicasPoblacionales/id/{id}:
 *   get:
 *     tags:
 *       - Características Poblacionales
 *     summary: Obtener características poblacionales por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la característica
 *     responses:
 *       200:
 *         description: Característica obtenida exitosamente
 *       404:
 *         description: Característica no encontrada
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id',   caracteristicasPoblacionalesController.getcaracteristicasPoblacionales);

/**
 * @swagger
 * /api/caracteristicasPoblacionales/all:
 *   get:
 *     tags:
 *       - Características Poblacionales
 *     summary: Obtener todas las características poblacionales
 *     responses:
 *       200:
 *         description: Lista de características obtenida correctamente
 *       500:
 *         description: Error al obtener los datos (Contactar equipo de API)
 */
router.get('/all', caracteristicasPoblacionalesController.getAllcaracteristicasPoblacionales);

/**
 * @swagger
 * /api/caracteristicasPoblacionales:
 *   post:
 *     tags:
 *       - Características Poblacionales
 *     summary: Insertar nuevas características poblacionales
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - migrante
 *               - indigena
 *             properties:
 *               migrante:
 *                 type: boolean
 *               indigena:
 *                 type: boolean
 *               idPersona:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Características poblacionales insertadas correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al insertar características poblacionales (Contactar equipo de API)
 */
router.post('/', caracteristicasPoblacionalesController.postcaracteristicasPoblacionales);

/**
 * @swagger
 * /api/caracteristicasPoblacionales:
 *   put:
 *     tags:
 *       - Características Poblacionales
 *     summary: Actualizar una característica poblacional existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - migrante
 *               - indigena
 *               - idPersona
 *             properties:
 *               id:
 *                 type: integer
 *               migrante:
 *                 type: boolean
 *               indigena:
 *                 type: boolean
 *               idPersona:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Característica actualizada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar (Contactar equipo de API)
 */
// router.put('/', putcaracteristicasPoblacionales);

/**
 * @swagger
 * /api/caracteristicasPoblacionales/id/{id}:
 *   delete:
 *     tags:
 *       - Características Poblacionales
 *     summary: Eliminar una característica poblacional por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la característica a eliminar
 *     responses:
 *       200:
 *         description: Característica eliminada correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar (Contactar equipo de API)
 */
router.delete('/id/:id', caracteristicasPoblacionalesController.deletecaracteristicasPoblacionales);

module.exports = router;