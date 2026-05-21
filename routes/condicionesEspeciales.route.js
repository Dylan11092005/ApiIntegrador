const { Router } = require('express');
const router = Router();
const condicionEspecialController = require('../controllers/condicionEspecialController');

/**
 * @swagger
 * /api/condicionesEspeciales/id/{id}:
 *   get:
 *     tags:
 *       - Condiciones Especiales
 *     summary: Obtener una condición especial por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la condición especial
 *     responses:
 *       200:
 *         description: Condición especial obtenida exitosamente
 *       404:
 *         description: Condición especial no encontrada
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id', condicionEspecialController.getCondicionEspecial);



/**
 * @swagger
 * /api/condicionesEspeciales/all:
 *   get:
 *     tags:
 *       - Condiciones Especiales
 *     summary: Obtener todas las condiciones especiales
 *     responses:
 *       200:
 *         description: Lista de condiciones especiales obtenida correctamente
 *       500:
 *         description: Error al obtener los datos (Contactar equipo de API)
 */
router.get('/all', condicionEspecialController.getAllCondicionesEspeciales);

/**
 * @swagger
 * /api/condicionesEspeciales:
 *   post:
 *     tags:
 *       - Condiciones Especiales
 *     summary: Insertar una nueva condición especial
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - discapacidad
 *               - tieneCondicionSalud
 *             properties:
 *               idPersona:
 *                 type: integer
 *                 nullable: true
 *               discapacidad:
 *                 type: boolean
 *               tipoDiscapacidad:
 *                 type: string
 *                 nullable: true
 *               subtipoDiscapacidad:
 *                 type: string
 *                 nullable: true
 *               tieneCondicionSalud:
 *                 type: boolean
 *               condicionSaludId:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Condición especial insertada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al insertar condición especial (Contactar equipo de API)
 */
router.post('/', condicionEspecialController.postCondicionEspecial);

/**
 * @swagger
 * /api/condicionesEspeciales:
 *   put:
 *     tags:
 *       - Condiciones Especiales
 *     summary: Actualizar una condición especial existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - discapacidad
 *               - tipoDiscapacidad
 *               - subtipoDiscapacidad
 *               - tieneCondicionSalud
 *               - condicionSaludId
 *               - idPersona
 *             properties:
 *               id:
 *                 type: integer
 *               discapacidad:
 *                 type: string
 *               tipoDiscapacidad:
 *                 type: string
 *               subtipoDiscapacidad:
 *                 type: string
 *               tieneCondicionSalud:
 *                 type: boolean
 *               condicionSaludId:
 *                 type: string
 *               idPersona:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Condición especial actualizada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar (Contactar equipo de API)
 */
// router.put('/', putMethod);

/**
 * @swagger
 * /api/condicionesEspeciales/id/{id}:
 *   delete:
 *     tags:
 *       - Condiciones Especiales
 *     summary: Eliminar una condición especial por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la condición especial a eliminar
 *     responses:
 *       200:
 *         description: Condición especial eliminada correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar (Contactar equipo de API)
 */
router.delete('/id/:id', condicionEspecialController.deleteCondicionEspecial);

/**
 * @swagger
 * /api/condicionesEspeciales/resumen/{idAlbergue}:
 *   get:
 *     tags:
 *       - Resumenes
 *     summary: Obtener resumen de condiciones especiales
 *     description: Devuelve un resumen de las condiciones especiales asociadas a un albergue.
 *     parameters:
 *       - in: path
 *         name: idAlbergue
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del albergue
 *     responses:
 *       200:
 *         description: Resumen de condiciones especiales obtenido correctamente
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
 *                     description: Objeto con información de las condiciones especiales
 *       400:
 *         description: Faltan parámetros obligatorios (idAlbergue)
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
 *                   example: Se esperaba el parametro idEdadPersona en la query
 *       404:
 *         description: No se encontraron condiciones especiales para el albergue indicado
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
 *                   example: No se encontraron las condiciones especiales especificada.
 *       500:
 *         description: Error interno al obtener condiciones especiales
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
 *                   example: Error al obtener condiciones especiales; detalle del error
 */
router.get('/resumen/:idAlbergue', condicionEspecialController.getResumenCondicionesEspeciales);


module.exports = router;