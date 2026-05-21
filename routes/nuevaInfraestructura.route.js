const { Router } = require('express');
const router = Router();
const nuevaInfraestructuraController = require('../controllers/nuevaInfraestructuraController');

/**
 * @swagger
 * /api/nuevaInfraestructura/all:
 *   get:
 *     tags:
 *       - NuevaInfraestructura
 *     summary: Obtener todas las infraestructuras
 *     responses:
 *       200:
 *         description: Lista de todas las infraestructuras
 *       500:
 *         description: Error al obtener infraestructuras (Contactar equipo de API)
 */
router.get('/all', nuevaInfraestructuraController.getAllNuevaInfraestructura);

/**
 * @swagger
 * /api/nuevaInfraestructura/id/{id}:
 *   get:
 *     tags:
 *       - NuevaInfraestructura
 *     summary: Obtener una infraestructura por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la infraestructura
 *     responses:
 *       200:
 *         description: Infraestructura obtenida exitosamente
 *       404:
 *         description: Infraestructura no encontrada
 *       500:
 *         description: Error interno del servidor (Contactar equipo de API)
 */
router.get('/id/:id', nuevaInfraestructuraController.getNuevaInfraestructura);

/**
 * @swagger
 * /api/nuevaInfraestructura:
 *   post:
 *     tags:
 *       - NuevaInfraestructura
 *     summary: Insertar nueva infraestructura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idAlbergue
 *               - fecha
 *               - motivo
 *               - tipo
 *               - descripcion
 *               - costoTotal
 *             properties:
 *               idAlbergue:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               motivo:
 *                 type: string
 *               tipo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               costoTotal:
 *                 type: number
 *     responses:
 *       201:
 *         description: Infraestructura insertada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al insertar infraestructura (Contactar equipo de API)
 */
router.post('/', nuevaInfraestructuraController.postNuevaInfraestructura);

/**
 * @swagger
 * /api/nuevaInfraestructura:
 *   put:
 *     tags:
 *       - NuevaInfraestructura
 *     summary: Actualizar infraestructura existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - idAlbergue
 *               - fecha
 *               - motivo
 *               - tipo
 *               - descripcion
 *               - costoTotal
 *             properties:
 *               id:
 *                 type: integer
 *               idAlbergue:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               motivo:
 *                 type: string
 *               tipo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               costoTotal:
 *                 type: number
 *     responses:
 *       200:
 *         description: Infraestructura actualizada correctamente
 *       400:
 *         description: Datos faltantes en el cuerpo de la solicitud
 *       500:
 *         description: Error al actualizar infraestructura (Contactar equipo de API)
 */
router.put('/', nuevaInfraestructuraController.putNuevaInfraestructura);

/**
 * @swagger
 * /api/nuevaInfraestructura/id/{id}:
 *   delete:
 *     tags:
 *       - NuevaInfraestructura
 *     summary: Eliminar infraestructura por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la infraestructura a eliminar
 *     responses:
 *       200:
 *         description: Infraestructura eliminada correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar infraestructura (Contactar equipo de API)
 */
router.delete('/id/:id', nuevaInfraestructuraController.deleteNuevaInfraestructura);

module.exports = router;