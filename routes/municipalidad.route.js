const {Router}= require('express');
const municipalidadController = require('../controllers/municipalidadController');
const router=Router();

  /**
 * @swagger
 * /api/municipalidades/{id}:
 *   get:
 *     tags:
 *       - Municipalidades
 *     summary: Obtener una municipalidad por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: int
 *         description: ID de la municipalidad
 *     responses:
 *       200:
 *         description: Municipalidad obtenida correctamente
 *       404:
 *         description: Municipalidad no encontrada
 *       500:
 *         description: Error al obtener municipalidad (Contactar equipo de API)
 */
router.get('/id/:id', municipalidadController.getMunicipalidad);   
    
/**
 * @swagger
 * /api/municipalidades:
 *   get:
 *     tags:
 *       - Municipalidades
 *     summary: Obtener todas las municipalidades
 *     responses:
 *       200:
 *         description: Lista de municipalidades obtenida correctamente
 *       500:
 *         description: Error al obtener municipalidades (Contactar equipo de API)
 */
router.get('/all', municipalidadController.getAllMunicipalidades);             

/**
 * @swagger
 * /api/municipalidades:
 *   post:
 *     tags:
 *       - Municipalidades
 *     summary: Crear una nueva municipalidad
 *     description: Inserta una nueva municipalidad en la base de datos con la información proporcionada.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - provincia
 *               - canton
 *               - distrito
 *               - direccion
 *               - telefono
 *               - correo
 *               - idUsuarioCreacion
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Municipalidad de San José
 *               provincia:
 *                 type: string
 *                 example: San José
 *               canton:
 *                 type: string
 *                 example: Central
 *               distrito:
 *                 type: string
 *                 example: Carmen
 *               direccion:
 *                 type: string
 *                 example: 100 metros norte del parque central
 *               telefono:
 *                 type: string
 *                 example: "2222-3333"
 *               correo:
 *                 type: string
 *                 example: contacto@sanjose.go.cr
 *               idUsuarioCreacion:
 *                 type: integer
 *                 example: 7
 *     responses:
 *       201:
 *         description: Municipalidad creada exitosamente.
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
 *                   example: Municipalidad insertada correctamente
 *                 data:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: Municipalidad de San José
 *                     provincia:
 *                       type: string
 *                       example: San José
 *                     canton:
 *                       type: string
 *                       example: Central
 *                     distrito:
 *                       type: string
 *                       example: Carmen
 *                     direccion:
 *                       type: string
 *                       example: 100 metros norte del parque central
 *                     telefono:
 *                       type: string
 *                       example: "2222-3333"
 *                     correo:
 *                       type: string
 *                       example: contacto@sanjose.go.cr
 *                     idUsuarioCreacion:
 *                       type: integer
 *                       example: 7
 *       400:
 *         description: Faltan datos obligatorios.
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
 *                   example: Faltan datos obligatorios
 *       500:
 *         description: Error interno al insertar la municipalidad.
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
 *                   example: Error al insertar municipalidad
 */
router.post('/', municipalidadController.postMunicipalidad);

/**
 * @swagger
 * /api/municipalidades/{id}:
 *   delete:
 *     tags:
 *       - Municipalidades
 *     summary: Eliminar una municipalidad por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: int
 *         description: ID de la municipalidad
 *     responses:
 *       200:
 *         description: Municipalidad eliminada correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar municipalidad (Contactar equipo de API)
 */
router.delete('/id/:id', municipalidadController.deleteMunicipalidad);

/**
 * @swagger
 * /api/municipalidades:
 *   put:
 *     tags:
 *       - Municipalidades
 *     summary: Actualizar una municipalidad existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - nombre
 *               - idUbicacion
 *               - telefono
 *               - correo
 *               - idAlbergue
 *               - idUsuario
 *               - idUsuarioCreacion
 *               - idUsuarioModificacion
 *             properties:
 *               id:
 *                 type: string
 *               nombre:
 *                 type: string
 *               idUbicacion:
 *                 type: string
 *               telefono:
 *                 type: string
 *               correo:
 *                 type: string
 *               idAlbergue:
 *                 type: int
 *               idUsuario:
 *                 type: int
 *               idUsuarioCreacion:
 *                 type: int
 *               idUsuarioModificacion:
 *                 type: int
 *     responses:
 *       200:
 *         description: Municipalidad actualizada correctamente
 *       400:
 *         description: Datos faltantes en el cuerpo de la solicitud
 *       500:
 *         description: Error al actualizar municipalidad (Contactar equipo de API)
 */
// router.put('/',   putMethod);

module.exports=router;