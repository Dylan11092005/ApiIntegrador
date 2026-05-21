const {Router}= require('express');
const router = Router();
const recursoAsignadoController = require('../controllers/recursoAsignadoController');

  /**
 * @swagger
 * /api/recursos-asignados/{id}:
 *   get:
 *     tags:
 *       - Recursos Asignados
 *     summary: Obtener recurso asignado por ID de producto y persona
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: Parámetro no utilizado directamente (revisar uso)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idProducto
 *               - idPersona
 *             properties:
 *               idProducto:
 *                 type: integer
 *               idPersona:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Recurso asignado obtenido correctamente
 *       400:
 *         description: Faltan idProducto o idPersona
 *       404:
 *         description: Recurso asignado no encontrado
 *       500:
 *         description: Error al obtener recurso asignado (Contactar equipo de API)
 */
//Devolver un solo producto por ID
router.get('/id/:id', recursoAsignadoController.getRecursoAsignado);   
    
/**
 * @swagger
 * /api/recursos-asignados:
 *   get:
 *     tags:
 *       - Recursos Asignados
 *     summary: Obtener todos los recursos asignados
 *     responses:
 *       200:
 *         description: Lista de recursos asignados obtenida correctamente
 *       500:
 *         description: Error al obtener los recursos asignados (Contactar equipo de API)
 */
//Devuelve todos los productos
router.get('/all', recursoAsignadoController.getAllRecursosAsignados);             

/**
 * @swagger
 * /api/recursos-asignados:
 *   post:
 *     tags:
 *       - Recursos Asignados
 *     summary: Asignar un recurso (producto) a una persona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idProducto
 *               - idPersona
 *               - cantidadAsignada
 *             properties:
 *               idProducto:
 *                 type: integer
 *               idPersona:
 *                 type: integer
 *               cantidadAsignada:
 *                 type: number
 *     responses:
 *       201:
 *         description: Recurso asignado insertado correctamente
 *       400:
 *         description: Datos faltantes o claves foráneas inválidas
 *       409:
 *         description: Recurso ya asignado previamente
 *       500:
 *         description: Error al insertar recurso asignado (Contactar equipo de API)
 */
// Registrar o insertar
router.post('/', recursoAsignadoController.postRecursoAsignado);

/**
 * @swagger
 * /api/recursos-asignados:
 *   delete:
 *     tags:
 *       - Recursos Asignados
 *     summary: Eliminar un recurso asignado por ID de producto y persona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idProducto
 *               - idPersona
 *             properties:
 *               idProducto:
 *                 type: integer
 *               idPersona:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Recurso asignado eliminado correctamente
 *       400:
 *         description: Faltan idProducto o idPersona
 *       404:
 *         description: No se encontró recurso para eliminar
 *       500:
 *         description: Error al eliminar recurso asignado (Contactar equipo de API)
 */
// //Eliminar
router.delete('/id/:id', recursoAsignadoController.deleteRecursoAsignado);

/**
 * @swagger
 * /api/recursos-asignados:
 *   put:
 *     tags:
 *       - Recursos Asignados
 *     summary: Actualizar un recurso asignado existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - idProducto
 *               - idPersona
 *               - cantidadAsignada
 *             properties:
 *               idProducto:
 *                 type: integer
 *               idPersona:
 *                 type: integer
 *               cantidadAsignada:
 *                 type: number
 *     responses:
 *       200:
 *         description: Recurso asignado actualizado correctamente
 *       400:
 *         description: Datos faltantes
 *       404:
 *         description: No se encontró el recurso para actualizar
 *       500:
 *         description: Error al actualizar recurso asignado (Contactar equipo de API)
 */
// //Actualizar
// router.put('/',   putMethod);

module.exports=router;