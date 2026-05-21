const { Router } = require('express');
const router = Router();
const ajusteInventarioController = require('../controllers/ajusteInventarioController');

/*
    * @swagger
    * /api/ajusteInventario/all:
    *   get:
    *     summary: Obtener todos los ajustes de inventario
    *     tags: 
    *       - AjusteInventario
    */
router.get('/all', ajusteInventarioController.getAllAjusteInventarios);

/*
    * @swagger
    * /api/ajusteInventario/id/{id}:
    *   get:
    *     summary: Obtener un ajuste de inventario por ID
    *     tags: 
    *       - AjusteInventario
    *     parameters:
    *       - in: path
    *         name: id
    *         required: true
    *         schema:
    *           type: integer
    *         description: ID del ajuste de inventario a obtener
    */
router.get('/id/:id', ajusteInventarioController.getAjuste);

/*
    * @swagger
    * /api/ajusteInventario:
    *   post:
    *     summary: Registrar un nuevo ajuste de inventario
    *     tags: 
    *       - AjusteInventario
    *     requestBody:
    *       required: true
    *       content:
    *         application/json:
    *           schema:
    *             type: object
    *             properties:
    *               idProducto:
    *                 type: integer
    *               justificacion:
    *                 type: string
    *               cantidadOriginal:
    *                 type: integer
    *               cantidadAjustada:
    *                 type: integer
    *               idUsuarioCreacion:
    *                 type: integer
    */
router.post('/', ajusteInventarioController.postAjuste);

/**
 * @swagger
 * /api/ajusteInventario/producto/{nombreProducto}:
 *   get:
 *     summary: Obtener ajustes de inventario por nombre del producto
 *     description: Devuelve la lista de ajustes de inventario realizados a un producto específico usando su nombre.
 *     tags:
 *       - Obtener
 *     parameters:
 *       - in: path
 *         name: nombreProducto
 *         required: true
 *         description: Nombre del producto del cual se desean obtener los ajustes
 *         schema:
 *           type: string
 *           example: "Arroz"
 *     responses:
 *       200:
 *         description: Lista de ajustes obtenida correctamente
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
 *                   example: Lista de ajustes obtenida correctamente
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       nombreProducto:
 *                         type: string
 *                         description: Nombre del producto
 *                         example: "Arroz"
 *                       cantidadOriginal:
 *                         type: integer
 *                         description: Cantidad original antes del ajuste
 *                         example: 100
 *                       cantidadAjustada:
 *                         type: integer
 *                         description: Cantidad después del ajuste
 *                         example: 80
 *                       justificacion:
 *                         type: string
 *                         description: Motivo del ajuste
 *                         example: "Producto dañado"
 *                       fechaCreacion:
 *                         type: string
 *                         format: date-time
 *                         description: Fecha y hora en que se registró el ajuste
 *                         example: "2025-08-06T14:23:00Z"
 *                       Estado:
 *                         type: string
 *                         description: Estado del ajuste (activo, inactivo, etc.)
 *                         example: "Activo"
 *       400:
 *         description: Parámetro nombreProducto no proporcionado o inválido
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
 *                   example: Se esperaba el parámetro nombreProducto en la query
 *       500:
 *         description: Error al obtener los ajustes de inventario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: Error al obtener los ajustes de inventario
 *                 error:
 *                   type: string
 *                   example: Error al conectarse con la base de datos
 */
router.get('/producto/:nombreProducto', ajusteInventarioController.getAjustesPorProducto);

module.exports = router;