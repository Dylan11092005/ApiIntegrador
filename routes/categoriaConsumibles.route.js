const { Router } = require('express');
const router = Router();
const categoriaConsumibleController = require('../controllers/categoriaConsumiblesController');

/**
 * @swagger
 * /api/categoriaConsumibleControllerControllers/id/{id}:
 *   get:
 *     tags:
 *       - Categorías de Consumibles
 *     summary: Obtener una categoría de consumible por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoría obtenida exitosamente
 *       404:
 *         description: Categoría no encontrada
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id', categoriaConsumibleController.getCategoriaConsumible);

/**
 * @swagger
 * /api/categoriaConsumibleControllerControllers/all:
 *   get:
 *     tags:
 *       - Categorías de Consumibles
 *     summary: Obtener todas las categorías de consumibles
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida correctamente
 *       500:
 *         description: Error al obtener los datos (Contactar equipo de API)
 */
router.get('/all', categoriaConsumibleController.getAllCategoriaConsumibles);

/**
 * @swagger
 * /api/categoriaConsumibleControllerController:
 *   post:
 *     tags:
 *       - Categorías de Consumibles
 *     summary: Insertar una nueva categoría de consumible
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *               idConsumible:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Categoría insertada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al insertar categoría de consumible (Contactar equipo de API)
 */
router.post('/', categoriaConsumibleController.postCategoriaConsumible);

/**
 * @swagger
 * /api/categoriaConsumibleControllerControllers:
 *   put:
 *     tags:
 *       - Categorías de Consumibles
 *     summary: Actualizar una categoría de consumible existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - nombre
 *               - idConsumible
 *             properties:
 *               id:
 *                 type: integer
 *               nombre:
 *                 type: string
 *               idConsumible:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Categoría actualizada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar (Contactar equipo de API)
 */
// router.put('/', putcategoriaConsumibleControllerController);

/**
 * @swagger
 * /api/categoriaConsumibleControllerControllers/id/{id}:
 *   delete:
 *     tags:
 *       - Categorías de Consumibles
 *     summary: Eliminar una categoría de consumible por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la categoría a eliminar
 *     responses:
 *       200:
 *         description: Categoría eliminada correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar (Contactar equipo de API)
 */
router.delete('/id/:id', categoriaConsumibleController.deleteCategoriaConsumible);

module.exports = router;