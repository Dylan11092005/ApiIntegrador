const { Router } = require('express');
const router = Router();
const detallePedidoConsumibleController = require('../controllers/detallePedidoConsumibleController');

/**
 * @swagger
 * /api/detallePedidoConsumibles/id/{id}:
 *   get:
 *     tags:
 *       - DetallePedidoConsumibles
 *     summary: Obtener un detalle de pedido de consumible por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle
 *     responses:
 *       200:
 *         description: Detalle obtenido correctamente
 *       404:
 *         description: Detalle no encontrado
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id', detallePedidoConsumibleController.getDetallePedidoConsumible);

/**
 * @swagger
 * /api/detallePedidoConsumibles/all:
 *   get:
 *     tags:
 *       - DetallePedidoConsumibles
 *     summary: Obtener todos los detalles de pedidos de consumibles
 *     responses:
 *       200:
 *         description: Lista de detalles obtenida correctamente
 *       500:
 *         description: Error al obtener los datos (Contactar equipo de API)
 */
router.get('/all', detallePedidoConsumibleController.getAllDetallePedidoConsumibles);

/**
 * @swagger
 * /api/detallePedidoConsumible:
 *   post:
 *     tags:
 *       - DetallePedidoConsumibles
 *     summary: Insertar un nuevo detalle de pedido consumible
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idPedido
 *               - idConsumible
 *               - cantidad
 *             properties:
 *               idPedido:
 *                 type: integer
 *               idConsumible:
 *                 type: integer
 *               cantidad:
 *                 type: number
 *     responses:
 *       201:
 *         description: Detalle insertado correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al insertar detalle de pedido consumible (Contactar equipo de API)
 */
router.post('/', detallePedidoConsumibleController.postDetallePedidoConsumible);

/**
 * @swagger
 * /api/detallePedidoConsumibles:
 *   put:
 *     tags:
 *       - DetallePedidoConsumibles
 *     summary: Actualizar un detalle de pedido de consumible existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - idPedido
 *               - idConsumible
 *               - cantidad
 *             properties:
 *               id:
 *                 type: integer
 *               idPedido:
 *                 type: string
 *               idConsumible:
 *                 type: string
 *               cantidad:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Detalle actualizado correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar (Contactar equipo de API)
 */
// router.put('/', putMethod);

/**
 * @swagger
 * /api/detallePedidoConsumibles/id/{id}:
 *   delete:
 *     tags:
 *       - DetallePedidoConsumibles
 *     summary: Eliminar un detalle por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del detalle
 *     responses:
 *       200:
 *         description: Detalle eliminado correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar (Contactar equipo de API)
 */
router.delete('/id/:id', detallePedidoConsumibleController.deleteDetallePedidoConsumible);

module.exports = router;