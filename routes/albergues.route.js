const { Router } = require('express');
const router = Router();
const albergueController = require('../controllers/albergueController');

/**
 * @swagger
 * /api/albergues/id/{id}:
 *   get:
 *     tags:
 *       - Albergues
 *     summary: Obtener un albergue por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del albergue
 *     responses:
 *       200:
 *         description: Albergue obtenido exitosamente
 *       404:
 *         description: Albergue no encontrado
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id', albergueController.getAlbergue);

/**
 * @swagger
 * /api/albergues:
 *   post:
 *     tags:
 *       - Albergues
 *     summary: Insertar albergue con datos completos (infraestructura, capacidad y ubicación)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idAlbergue
 *               - nombre
 *               - region
 *               - provincia
 *               - canton
 *               - distrito
 *               - direccion
 *               - tipoEstablecimiento
 *               - administrador
 *               - telefono
 *               - capacidadPersonas
 *               - ocupacion
 *               - cocina
 *               - duchas
 *               - serviciosSanitarios
 *               - bodega
 *               - menajeMobiliario
 *               - tanqueAgua
 *               - areaTotalM2
 *               - idMunicipalidad
 *             properties:
 *               idAlbergue:
 *                 type: string
 *                 description: ID del albergue
 *               nombre:
 *                 type: string
 *                 description: Nombre del albergue
 *               region:
 *                 type: string
 *               provincia:
 *                 type: string
 *               canton:
 *                 type: string
 *               distrito:
 *                 type: string
 *               direccion:
 *                 type: string
 *               tipoEstablecimiento:
 *                 type: string
 *               administrador:
 *                 type: string
 *               telefono:
 *                 type: string
 *               capacidadPersonas:
 *                 type: integer
 *               ocupacion:
 *                 type: integer
 *               cocina:
 *                 type: boolean
 *               duchas:
 *                 type: boolean
 *               serviciosSanitarios:
 *                 type: boolean
 *               bodega:
 *                 type: boolean
 *               menajeMobiliario:
 *                 type: boolean
 *               tanqueAgua:
 *                 type: boolean
 *               areaTotalM2:
 *                 type: number
 *               idMunicipalidad:
 *                 type: integer
 *               capacidadColectiva:
 *                 type: integer
 *                 nullable: true
 *               cantidadFamilias:
 *                 type: integer
 *                 nullable: true
 *               egresos:
 *                 type: integer
 *                 nullable: true
 *               sospechososSanos:
 *                 type: integer
 *                 nullable: true
 *               otros:
 *                 type: string
 *                 nullable: true
 *               coordenadaX:
 *                 type: number
 *                 nullable: true
 *               coordenadaY:
 *                 type: number
 *                 nullable: true
 *               tipoAlbergue:
 *                 type: string
 *                 nullable: true
 *               condicionAlbergue:
 *                 type: string
 *                 nullable: true
 *               especificacion:
 *                 type: string
 *                 nullable: true
 *               detalleCondicion:
 *                 type: string
 *                 nullable: true
 *               seccion:
 *                 type: string
 *                 nullable: true
 *               requerimientosTecnicos:
 *                 type: string
 *                 nullable: true
 *               costoRequerimientosTecnicos:
 *                 type: number
 *                 nullable: true
 *               color:
 *                 type: string
 *                 nullable: true
 *               idPedidoAbarrote:
 *                 type: integer
 *                 nullable: true
 *               idUsuarioCreacion:
 *                 type: integer
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Albergue registrado correctamente
 *       400:
 *         description: Faltan datos requeridos
 *       500:
 *         description: Error al insertar albergue
 */
router.post('/', albergueController.postAlbergue);

/**
 * @swagger
 * /api/albergues/{id}:
 *   put:
 *     tags:
 *       - Albergues
 *     summary: Actualizar un albergue
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del albergue a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - condicionAlbergue
 *               - especificacion
 *               - capacidadPersonas
 *               - capacidadColectiva
 *               - ocupacion
 *               - detalleCondicion
 *               - cocina
 *               - duchas
 *               - serviciosSanitarios
 *               - bodega
 *               - menajeMobiliario
 *               - tanqueAgua
 *               - administrador
 *               - telefono
 *               - color
 *               - idUsuarioModificacion
 *             properties:
 *               condicionAlbergue:
 *                 type: string
 *               especificacion:
 *                 type: string
 *               capacidadPersonas:
 *                 type: integer
 *               capacidadColectiva:
 *                 type: integer
 *               ocupacion:
 *                 type: integer
 *               detalleCondicion:
 *                 type: string
 *               cocina:
 *                 type: boolean
 *               duchas:
 *                 type: boolean
 *               serviciosSanitarios:
 *                 type: boolean
 *               bodega:
 *                 type: boolean
 *               menajeMobiliario:
 *                 type: boolean
 *               tanqueAgua:
 *                 type: boolean
 *               administrador:
 *                 type: string
 *               telefono:
 *                 type: string
 *               color:
 *                 type: string
 *               idUsuarioModificacion:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Albergue actualizado correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar el albergue (Contactar equipo de API)
 */
router.put('/:id', albergueController.putAlbergue);

/**
 * @swagger
 * /api/albergues/id/{id}:
 *   delete:
 *     tags:
 *       - Albergues
 *     summary: Eliminar un albergue por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del albergue a eliminar
 *     responses:
 *       200:
 *         description: Albergue eliminado correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar el albergue (Contactar equipo de API)
 */
router.delete('/id/:id', albergueController.deleteAlbergue);

/**
 * @swagger
 * /api/albergues/consulta/id/{id}:
 *   get:
 *     summary: Consultar albergue por ID
 *     tags: 
 *       - Albergues
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del albergue
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Albergue obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: ID no proporcionado
 *       404:
 *         description: Albergue no encontrado
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/consulta/id/:id', albergueController.getForIdAlbergue);

/**
 * @swagger
 * /api/albergues/consulta/nombre/{nombre}:
 *   get:
 *     summary: Consultar albergue por nombre
 *     tags:
 *       - Albergues
 *     parameters:
 *       - in: path
 *         name: nombre
 *         required: true
 *         description: Nombre del albergue (codificado en URL si tiene espacios)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Albergue obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: Nombre no proporcionado
 *       404:
 *         description: Albergue no encontrado
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/consulta/nombre/:nombre', albergueController.getForNombreAlbergue);

/** * @swagger
 * /api/albergues/consulta/distrito/{distrito}:
 *   get:
 *     summary: Consultar albergue por distrito
 *     tags:
 *       - Albergues
 *     parameters:
 *       - in: path
 *         name: distrito
 *         required: true
 *         description: Distrito del albergue
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Albergue(s) obtenido(s) exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/consulta/distrito/:distrito', albergueController.getForDistritoAlbergue);

/** * @swagger
 * /api/albergues/consulta/canton/{canton}:
 *   get:
 *     summary: Consultar albergue por cantón
 *     tags:
 *       - Albergues
 *     parameters:
 *       - in: path
 *         name: canton
 *         required: true
 *         description: Cantón del albergue
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Albergue(s) obtenido(s) exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/consulta/canton/:canton', albergueController.getForCantonAlbergue);

/** * @swagger
 * /api/albergues/consulta/provincia/{provincia}:
 *   get:
 *     summary: Consultar albergue por provincia
 *     tags:
 *       - Albergues
 *     parameters:
 *       - in: path
 *         name: provincia
 *         required: true
 *         description: Provincia del albergue
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Albergue(s) obtenido(s) exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 */
router.get('/consulta/provincia/:provincia', albergueController.getForProvinciaAlbergue);

/**
 * @swagger
 * /api/albergues/resumen/color/{color}:
 *   get:
 *     summary: Consultar albergue por color
 *     tags:
 *       - Resumenes
 *     parameters:
 *       - in: path
 *         name: color
 *         required: true
 *         description: color del albergue (codificado en URL si tiene espacios)
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Albergue obtenido exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *       400:
 *         description: color no proporcionado
 *       404:
 *         description: Albergue no encontrado
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */

router.get('/resumen/color/:color', albergueController.getResumenAlberguesColor);

/**
 * @swagger
 * /api/albergues/consulta/porUsuario/{idUsuario}:
 *   get:
 *     summary: Obtener albergues por ID de usuario
 *     tags:
 *       - Albergues
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         description: ID del usuario para obtener sus albergues
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Albergues obtenidos exitosamente para el usuario
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
 *                   example: Albergues obtenidos exitosamente para el usuario
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: "Albergue Esperanza"
 *                     direccion:
 *                       type: string
 *                       example: "Calle 123, Ciudad"
 *                     capacidad:
 *                       type: integer
 *                       example: 50
 *       400:
 *         description: ID de usuario no proporcionado
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
 *                   example: ID de usuario es requerido
 *       404:
 *         description: Albergues no encontrados para el usuario
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
 *                   example: Albergues no encontrados para el usuario
 *       500:
 *         description: Error al obtener los albergues del usuario
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
 *                   example: Error al obtener los albergues del usuario
 *                 error:
 *                   type: string
 *                   example: Error inesperado
 */
router.get('/consulta/porUsuario/:idUsuario', albergueController.getAllAlberguesPorUsuario);

/**
 * @swagger
 * /api/albergues/alberguefamilia:
 *   put:
 *     tags:
 *       - Albergues
 *     summary: Actualizar relación entre familia y albergue
 *     description: Asigna o actualiza el albergue al que pertenece una familia.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idFamilia
 *               - idAlbergue
 *               - idUsuarioModificacion
 *             properties:
 *               idFamilia:
 *                 type: integer
 *                 example: 12
 *               idAlbergue:
 *                 type: integer
 *                 example: 5
 *               idUsuarioModificacion:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Relación actualizada correctamente.
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
 *                   example: Todo salio bien
 *       400:
 *         description: Faltan parámetros obligatorios.
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
 *                   example: Se esperaba el parametro id en la query
 *       500:
 *         description: Error interno al actualizar la relación familia-albergue.
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
 *                   example: Error al actualizar albergue familia: Detalle del error
 */


/**
 * @swagger
 * /api/albergues/alberguefamilia:
 *   put:
 *     tags:
 *       - Albergues
 *     summary: Actualizar relación entre familia y albergue
 *     description: Asigna o actualiza el albergue al que pertenece una familia.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idFamilia
 *               - idAlbergue
 *               - idUsuarioModificacion
 *             properties:
 *               idFamilia:
 *                 type: integer
 *                 example: 12
 *               idAlbergue:
 *                 type: integer
 *                 example: 5
 *               idUsuarioModificacion:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Albergue actualizado correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar el albergue (Contactar equipo de API)
 */
router.put('/alberguefamilia', albergueController.putAlbergueFamilia);

module.exports = router;