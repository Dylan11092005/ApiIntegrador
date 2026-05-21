const { Router } = require('express');
const router = Router();
const inventarioController = require('../controllers/inventarioController');

/**
 * @swagger
 * /api/inventario/all:
 *   get:
 *     tags:
 *       - Inventario
 *     summary: Obtener todos los registros de inventario
 *     description: Devuelve una lista de todos los registros de inventario
 *     responses:
 *       200:
 *         description: Lista de inventario obtenida exitosamente
 *       500:
 *         description: Error al obtener el inventario (Contactar equipo de API)
 */
router.get('/all', inventarioController.getAllInventario);

/**
 * @swagger
 * /api/inventario/id/{id}:
 *   get:
 *     tags:
 *       - Inventario
 *     summary: Obtener un registro de inventario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del inventario
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Registro de inventario obtenido exitosamente
 *       404:
 *         description: Registro de inventario no encontrado
 *       500:
 *         description: Error interno del servidor (Contactar equipo de API)
 */
router.get('/id/:id', inventarioController.getInventario);

/**
 * @swagger
 * /api/inventario/resumen/suministros:
 *   get:
 *     tags:
 *       - Resumenes
 *     summary: Obtener resumen de suministros
 *     description: Devuelve un resumen de los suministros según el ID especificado en la query.
 *     parameters:
 *       - in: query
 *         name: idSuministros
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del suministro a consultar.
 *         example: 5
 *     responses:
 *       200:
 *         description: Resumen de suministros obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idSuministro:
 *                         type: integer
 *                         example: 5
 *                       nombre:
 *                         type: string
 *                         example: Botellas de agua
 *                       cantidad:
 *                         type: integer
 *                         example: 120
 *                       unidad:
 *                         type: string
 *                         example: litros
 *       400:
 *         description: Parámetro idSuministros no proporcionado en la query.
 *       404:
 *         description: No se encontraron suministros para el ID especificado.
 *       500:
 *         description: Error interno al obtener el resumen de suministros.
 */
router.get('/resumen/suministros', inventarioController.getResumenSuministros);

/**
 * @swagger
 * /api/inventario:
 *   post:
 *     tags:
 *       - Inventario
 *     summary: Insertar un nuevo registro de inventario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idAlbergue
 *               - fecha
 *               - articulo
 *               - cantidad
 *               - estado
 *               - comentario
 *             properties:
 *               idAlbergue:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               articulo:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *               estado:
 *                 type: string
 *               comentario:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registro de inventario insertado correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al insertar inventario (Contactar equipo de API)
 */
router.post('/', inventarioController.postInventario);

/**
 * @swagger
 * /api/inventario:
 *   put:
 *     tags:
 *       - Inventario
 *     summary: Actualizar un registro de inventario existente
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
 *               - articulo
 *               - cantidad
 *               - estado
 *               - comentario
 *             properties:
 *               id:
 *                 type: integer
 *               idAlbergue:
 *                 type: integer
 *               fecha:
 *                 type: string
 *                 format: date
 *               articulo:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *               estado:
 *                 type: string
 *               comentario:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registro de inventario actualizado correctamente
 *       400:
 *         description: Datos faltantes en el cuerpo de la solicitud
 *       500:
 *         description: Error al actualizar inventario (Contactar equipo de API)
 */
router.put('/', inventarioController.putInventario);

/**
 * @swagger
 * /api/inventario/id/{id}:
 *   delete:
 *     tags:
 *       - Inventario
 *     summary: Eliminar un registro de inventario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del inventario a eliminar
 *     responses:
 *       200:
 *         description: Registro de inventario eliminado correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar el inventario (Contactar equipo de API)
 */
router.delete('/id/:id', inventarioController.deleteInventario);

module.exports = router;