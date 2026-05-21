const { Router } = require('express');
const router = Router();
const familiaController = require('../controllers/familiaController');

/**
 * @swagger
 * /api/familias/id/{id}:
 *   get:
 *     tags:
 *       - Familias
 *     summary: Obtener una familia por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la familia
 *     responses:
 *       200:
 *         description: Familia obtenida exitosamente
 *       404:
 *         description: Familia no encontrada
 *       500:
 *         description: Error al obtener familia (Contactar equipo de API)
 */
router.get('/id/:id', familiaController.getFamilia);

/**
 * @swagger
 * /api/familias/all:
 *   get:
 *     tags:
 *       - Familias
 *     summary: Obtener todas las familias
 *     responses:
 *       200:
 *         description: Lista de familias
 *       500:
 *         description: Error al obtener familias (Contactar equipo de API)
 */
router.get('/all', familiaController.getAllFamilias);

/**
 * @swagger
 * /api/familias:
 *   post:
 *     tags:
 *       - Familias
 *     summary: Insertar una nueva familia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - provincia
 *               - canton
 *               - distrito
 *               - codigoFamilia
 *               - cantidadPersonas
 *               - idAlbergue
 *               - idAmenaza
 *             properties:
 *               provincia:
 *                 type: string
 *                 example: "San José"
 *               canton:
 *                 type: string
 *                 example: "Central"
 *               distrito:
 *                 type: string
 *                 example: "Carmen"
 *               direccion:
 *                 type: string
 *                 nullable: true
 *                 example: "Del parque 200m al sur"
 *               codigoFamilia:
 *                 type: string
 *                 example: "FAM12345"
 *               cantidadPersonas:
 *                 type: integer
 *                 example: 4
 *               idAlbergue:
 *                 type: integer
 *                 example: 2
 *               idAmenaza:
 *                 type: integer
 *                 example: 5
 *               idPersona:
 *                 type: integer
 *                 nullable: true
 *                 example: 10
 *               idUsuarioCreacion:
 *                 type: integer
 *                 nullable: true
 *                 example: 1
 *     responses:
 *       201:
 *         description: Familia insertada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al insertar familia (Contactar equipo de API)
 */
router.post('/', familiaController.postFamilia);

/**
 * @swagger
 * /api/familias:
 *   put:
 *     tags:
 *       - Familias
 *     summary: Actualizar una familia existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - codigoFamilia
 *               - cantidadPersonas
 *               - idAlbergue
 *               - idUbicacion
 *               - idAmenaza
 *             properties:
 *               id:
 *                 type: string
 *               codigoFamilia:
 *                 type: string
 *               cantidadPersonas:
 *                 type: integer
 *               idAlbergue:
 *                 type: string
 *               idUbicacion:
 *                 type: string
 *               idAmenaza:
 *                 type: string
 *     responses:
 *       200:
 *         description: Familia actualizada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar familia (Contactar equipo de API)
 */
router.put('/', familiaController.putFamilia);

/**
 * @swagger
 * /api/familias/egreso:
 *   put:
 *     tags:
 *       - Familias
 *     summary: Registrar egreso de una familia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - idModificacion
 *             properties:
 *               id:
 *                 type: integer
 *                 description: ID de la familia que egresa
 *               idModificacion:
 *                 type: integer
 *                 description: ID del usuario que realiza la modificación
 *     responses:
 *       200:
 *         description: Egreso registrado exitosamente
 *       400:
 *         description: Datos inválidos en la solicitud
 *       404:
 *         description: No se encontró la familia correspondiente
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.put('/egreso', familiaController.putEgresoFamilia);

/**
 * @swagger
 * /api/familias/vista/familiaConJefe:
 *   get:
 *     tags:
 *       - Familias
 *     summary: Obtener familia con jefe
 *     responses:
 *       200:
 *         description: Familia con jefe obtenida exitosamente
 *       404:
 *         description: Familia no encontrada
 *       500:
 *         description: Error al obtener familia (Contactar equipo de API)
 */

router.get('/vista/familiaConJefe', familiaController.getVistaFamiliaJefe);

/**
 * @swagger
 * /api/familias/consulta/familiaConJefe/{cedula}:
 *   get:
 *     tags:
 *       - Familias
 *     summary: Obtener familia por cédula del jefe
 *     parameters:
 *       - in: path
 *         name: cedula
 *         required: true
 *         schema:
 *           type: string
 *         description: Cédula del jefe de la familia
 *     responses:
 *       200:
 *         description: Familia obtenida exitosamente
 *       404:
 *         description: Familia no encontrada
 *       500:
 *         description: Error al obtener familia (Contactar equipo de API)
 */
router.get('/consulta/familiaConJefe/:cedula', familiaController.getForCedulaJefe);

/**
 * @swagger
 * /api/familias/requerimiento/indentificador/{canton}:
 *   get:
 *     tags:
 *       - Familias
 *     summary: Generar identificador de familia por cantón
 *     parameters:
 *       - in: path
 *         name: canton
 *         required: true
 *         schema:
 *           type: string
 *         description: Cantón para generar el identificador
 *     responses:
 *       200:
 *         description: Identificador generado exitosamente
 *       400:
 *         description: Error en los parámetros de entrada
 *       500:
 *         description: Error al generar identificador (Contactar equipo de API)
 */
router.get('/requerimiento/indentificador/:canton', familiaController.generarIdentificador);

/**
 * @swagger
 * /api/familias/codigoFamilia/{codigoFamilia}:
 *   get:
 *     tags:
 *       - Familias
 *     summary: Obtener una familia por codigoFamilia
 *     parameters:
 *       - in: path
 *         name: codigoFamilia
 *         required: true
 *         schema:
 *           type: string
 *         description: codigoFamilia de la familia
 *     responses:
 *       200:
 *         description: Familia obtenida exitosamente
 *       404:
 *         description: Familia no encontrada
 *       500:
 *         description: Error al obtener familia (Contactar equipo de API)
 */
router.get('codigoFamilia/:codigoFamilia', familiaController.getObtenerReferenciasPorCodigoFamilia);

/**
 * @swagger
 * /api/familias/consulta/porUsuario/{idUsuario}:
 *   get:
 *     summary: Obtener familias por ID de usuario
 *     tags:
 *       - Familias
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         description: ID del usuario para obtener sus familias asociadas
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Familias obtenidas exitosamente
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
 *                       codigoFamilia:
 *                         type: string
 *                         example: "FAM123"
 *                       cantidadPersonas:
 *                         type: integer
 *                         example: 4
 *                       idAlbergue:
 *                         type: integer
 *                         example: 2
 *       400:
 *         description: Parámetro idUsuario no proporcionado
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
 *                   example: Se esperaba el parametro idUsuario en la query
 *       404:
 *         description: No se encontraron familias para el usuario proporcionado
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
 *                   example: No se encontraron familias para el usuario proporcionado
 *       500:
 *         description: Error al obtener familias por usuario (Contactar equipo de API)
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
 *                   example: Error al obtener familias por usuario; error inesperado
 */
router.get('/consulta/porUsuario/:idUsuario', familiaController.getAllFamiliasPorUsuario);

/**
 * @swagger
 * /api/familias/obtener/referencia/{codigoFamilia}:
 *   get:
 *     summary: Obtener referencias por código de familia
 *     description: Obtiene todas las referencias asociadas a una familia específica mediante su código de familia
 *     tags:
 *       - Obtener
 *     parameters:
 *       - in: path
 *         name: codigoFamilia
 *         required: true
 *         description: Código único que identifica a la familia
 *         schema:
 *           type: string
 *           example: "FAM001"
 *     responses:
 *       200:
 *         description: Referencias encontradas exitosamente
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
 *                       codigoFamilia:
 *                         type: string
 *                         description: Código de la familia
 *                         example: "FAM001"
 *                       tipoAyuda:
 *                         type: string
 *                         description: Tipo de ayuda proporcionada
 *                         example: "Alimentaria"
 *                       descripcion:
 *                         type: string
 *                         description: Descripción detallada de la ayuda
 *                         example: "Entrega de canasta básica familiar"
 *                       fechaEntrega:
 *                         type: string
 *                         format: date
 *                         description: Fecha de entrega de la ayuda
 *                         example: "2024-01-15"
 *                       responsable:
 *                         type: string
 *                         description: Persona responsable de la entrega
 *                         example: "Juan Pérez"
 *       400:
 *         description: Parámetro codigoFamilia no proporcionado
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
 *                   example: Se esperaba el parametro codigoFamilia en la query
 *       404:
 *         description: No se encontraron referencias para el código de familia proporcionado
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
 *                   example: No se encontraron referencias para el código de familia proporcionado
 *       500:
 *         description: Error al obtener referencias por código de familia (Contactar equipo de API)
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
 *                   example: Error al obtener referencias por código de familia; Database connection failed
 */
router.get('/obtener/referencia/:codigoFamilia', familiaController.getObtenerReferenciasPorCodigoFamilia);

module.exports = router;