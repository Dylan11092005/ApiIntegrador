const { Router } = require('express');
const router = Router();
const consumibleController = require('../controllers/consumibleController');

/**
 * @swagger
 * /api/consumibles/id/{id}:
 *   get:
 *     tags:
 *       - Consumibles
 *     summary: Obtener un consumible por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del consumible
 *     responses:
 *       200:
 *         description: Consumible obtenido correctamente
 *       404:
 *         description: Consumible no encontrado
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id', consumibleController.getConsumible);

/**
 * @swagger
 * /api/consumibles/all:
 *   get:
 *     tags:
 *       - Consumibles
 *     summary: Obtener todos los consumibles
 *     responses:
 *       200:
 *         description: Lista de consumibles obtenida correctamente
 *       500:
 *         description: Error al obtener los datos (Contactar equipo de API)
 */
router.get('/all', consumibleController.getAllConsumibles);

/**
 * @swagger
 * /api/consumibles:
 *   post:
 *     tags:
 *       - Consumibles
 *     summary: Insertar un nuevo consumible
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - unidadMedidaNombre
 *               - categoriaNombre
 *               - cantidad
 *             properties:
 *               nombre:
 *                 type: string
 *               unidadMedidaNombre:
 *                 type: string
 *               categoriaNombre:
 *                 type: string
 *               cantidad:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Consumible insertado correctamente
 *       400:
 *         description: Datos faltantes en la solicitud
 *       500:
 *         description: Error al insertar consumible (Contactar equipo de API)
 */
router.post('/', consumibleController.postConsumible);

/**
 * @swagger
 * /api/consumibles:
 *   put:
 *     tags:
 *       - Consumibles
 *     summary: Actualizar un consumible existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - nombre
 *               - idUnidadMedida
 *               - idCategoria
 *             properties:
 *               id:
 *                 type: string
 *               nombre:
 *                 type: string
 *               idUnidadMedida:
 *                 type: integer
 *               idCategoria:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Consumible actualizado correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar (Contactar equipo de API)
 */
// router.put('/', putMethod);

/**
 * @swagger
 * /api/consumibles/id/{id}:
 *   delete:
 *     tags:
 *       - Consumibles
 *     summary: Eliminar un consumible por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del consumible
 *     responses:
 *       200:
 *         description: Consumible eliminado correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar (Contactar equipo de API)
 */
router.delete('/id/:id', consumibleController.deleteConsumible);

module.exports = router;