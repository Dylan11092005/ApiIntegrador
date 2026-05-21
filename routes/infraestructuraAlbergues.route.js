const { Router } = require('express');
const router = Router();
const infraestructuraAlbergueController = require('../controllers/infraestructuraAlbergueController.js');

/**
 * @swagger
 * /api/infraestructurasAlbergues/all:
 *   get:
 *     tags:
 *       - InfraestructurasAlbergues
 *     summary: Obtener todas las infraestructuras de albergues
 *     responses:
 *       200:
 *         description: Infraestructuras obtenidas correctamente
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/all', infraestructuraAlbergueController.getAllInfraestructuraAlbergue);

/**
 * @swagger
 * /api/infraestructurasAlbergues/id/{id}:
 *   get:
 *     tags:
 *       - InfraestructurasAlbergues
 *     summary: Obtener infraestructura por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la infraestructura
 *     responses:
 *       200:
 *         description: Infraestructura obtenida correctamente
 *       400:
 *         description: Falta el ID
 *       404:
 *         description: Infraestructura no encontrada
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id', infraestructuraAlbergueController.getInfraestructuraAlbergue);

/**
 * @swagger
 * /api/infraestructurasAlbergues:
 *   post:
 *     tags:
 *       - InfraestructurasAlbergues
 *     summary: Insertar una nueva infraestructura de albergue
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cocina
 *               - duchas
 *               - servicios_sanitarios
 *               - bodega
 *               - menaje_mobiliario
 *               - tanque_agua
 *               - area_total_m2
 *               - idAlbergue
 *             properties:
 *               cocina:
 *                 type: boolean
 *               duchas:
 *                 type: boolean
 *               servicios_sanitarios:
 *                 type: boolean
 *               bodega:
 *                 type: boolean
 *               menaje_mobiliario:
 *                 type: boolean
 *               tanque_agua:
 *                 type: boolean
 *               area_total_m2:
 *                 type: number
 *                 format: float
 *               idAlbergue:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Infraestructura insertada correctamente
 *       400:
 *         description: Datos faltantes
 *       409:
 *         description: Infraestructura duplicada
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.post('/', infraestructuraAlbergueController.postInfraestructuraAlbergue);

/**
 * @swagger
 * /api/infraestructurasAlbergues:
 *   put:
 *     tags:
 *       - InfraestructurasAlbergues
 *     summary: Actualizar una infraestructura existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - cocina
 *               - duchas
 *               - servicios_sanitarios
 *               - bodega
 *               - menaje_mobiliario
 *               - tanque_agua
 *               - area_total_m2
 *             properties:
 *               id:
 *                 type: integer
 *               cocina:
 *                 type: boolean
 *               duchas:
 *                 type: boolean
 *               servicios_sanitarios:
 *                 type: boolean
 *               bodega:
 *                 type: boolean
 *               menaje_mobiliario:
 *                 type: boolean
 *               tanque_agua:
 *                 type: boolean
 *               area_total_m2:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Infraestructura actualizada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.put('/', infraestructuraAlbergueController.putInfraestructuraAlbergue);

/**
 * @swagger
 * /api/infraestructurasAlbergues/id/{id}:
 *   delete:
 *     tags:
 *       - InfraestructurasAlbergues
 *     summary: Eliminar una infraestructura por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la infraestructura
 *     responses:
 *       200:
 *         description: Infraestructura eliminada correctamente
 *       400:
 *         description: Falta el ID
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.delete('/id/:id', infraestructuraAlbergueController.deleteInfraestructuraAlbergue);

module.exports = router;