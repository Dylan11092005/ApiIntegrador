const { Router } = require('express');
const upload = require('../middleware/uploadMiddleware');
const router = Router();
const personasController = require('../controllers/personasController');

/**
 * @swagger
 * /api/personas/all:
 *   get:
 *     tags:
 *       - Personas
 *     summary: Obtener todas las personas
 *     responses:
 *       200:
 *         description: Personas obtenidas correctamente
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/all', personasController.getAllPersonas);

/**
 * @swagger
 * /api/personas/user/{idUsuario}:
 *   get:
 *     tags:
 *       - Personas
 *     summary: Obtener todas las personas asociadas a un usuario
 *     parameters:
 *       - in: path
 *         name: idUsuario
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de personas asociadas al usuario
 *       404:
 *         description: No se encontraron personas para este usuario
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/user/:idUsuario', personasController.getAllPersonasByUsuario);

/**
 * @swagger
 * /api/personas/id/{id}:
 *   get:
 *     tags:
 *       - Personas
 *     summary: Obtener persona por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Persona encontrada
 *       404:
 *         description: Persona no encontrada
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id', personasController.getPersona);

/**
 * @swagger
 * /api/personas/resumen/discapacidad/{idDiscapacidad}:
 *   get:
 *     tags:
 *       - Resumenes
 *     summary: Obtener resumen de personas por discapacidad
 *     description: Devuelve un resumen de las personas que presentan una discapacidad según el ID especificado.
 *     parameters:
 *       - in: path
 *         name: idDiscapacidad
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la discapacidad a consultar.
 *         example: 2
 *     responses:
 *       200:
 *         description: Resumen de personas con la discapacidad obtenida exitosamente.
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
 *                       idPersona:
 *                         type: integer
 *                         example: 15
 *                       nombre:
 *                         type: string
 *                         example: Juan Pérez
 *                       discapacidad:
 *                         type: string
 *                         example: Auditiva
 *                       edad:
 *                         type: integer
 *                         example: 34
 *                       sexo:
 *                         type: string
 *                         example: Masculino
 *       400:
 *         description: Parámetro idDiscapacidad no proporcionado.
 *       404:
 *         description: No se encontraron personas con la discapacidad especificada.
 *       500:
 *         description: Error interno al obtener el resumen de personas por discapacidad.
 */
router.get('/resumen/discapacidad/:idDiscapacidad', personasController.getResumenDiscapacidad);

/**
 * @swagger
 * /api/personas:
 *   post:
 *     tags:
 *       - Personas
 *     summary: Registrar múltiples personas con una firma común
 *     description: Inserta una o más personas. La firma se aplica por igual a todas (si hay jefe de familia).
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - personas
 *             properties:
 *               personas:
 *                 type: string
 *                 description: Array JSON de objetos persona serializado como texto.
 *                 example: |
 *                   [
 *                     {
 *                       "nombre": "Juan",
 *                       "primerApellido": "Pérez",
 *                       "segundoApellido": "Rodríguez",
 *                       "idFamilia": 1,
 *                       "tieneCondicionSalud": true,
 *                       "descripcionCondicionSalud": "Hipertensión",
 *                       "discapacidad": false,
 *                       "tipoDiscapacidad": null,
 *                       "subtipoDiscapacidad": null,
 *                       "paisOrigen": "Nicaragua",
 *                       "autoidentificacionCultural": "Afrodescendiente",
 *                       "puebloIndigena": "Bribri",
 *                       "firma": "firma.jpg",
 *                       "tipoIdentificacion": "Cédula",
 *                       "numeroIdentificacion": "123456789",
 *                       "nacionalidad": "Costarricense",
 *                       "parentesco": "Padre",
 *                       "esJefeFamilia": true,
 *                       "fechaNacimiento": "1980-05-15",
 *                       "genero": "Masculino",
 *                       "sexo": "Masculino",
 *                       "telefono": "88889999",
 *                       "contactoEmergencia": "Ana María 87001122",
 *                       "observaciones": "Usa medicamentos diariamente",
 *                       "estaACargoMenor": false,
 *                       "usaMedicamentos": true,
 *                       "traeMedicamentos": false,
 *                       "idUsuarioCreacion": 1
 *                     },
 *                     {
 *                       "nombre": "María",
 *                       "primerApellido": "González",
 *                       "segundoApellido": "López",
 *                       "idFamilia": 1,
 *                       "tieneCondicionSalud": false,
 *                       "descripcionCondicionSalud": null,
 *                       "discapacidad": true,
 *                       "tipoDiscapacidad": "Motora",
 *                       "subtipoDiscapacidad": "Parálisis parcial",
 *                       "paisOrigen": null,
 *                       "autoidentificacionCultural": null,
 *                       "puebloIndigena": null,
 *                       "firma": "firma.jpg",
 *                       "tipoIdentificacion": "DIMEX",
 *                       "numeroIdentificacion": "987654321",
 *                       "nacionalidad": "Nicaragüense",
 *                       "parentesco": "Madre",
 *                       "esJefeFamilia": false,
 *                       "fechaNacimiento": "1985-08-25",
 *                       "genero": "Femenino",
 *                       "sexo": "Femenino",
 *                       "telefono": "89998888",
 *                       "contactoEmergencia": null,
 *                       "observaciones": null,
 *                       "estaACargoMenor": true,
 *                       "usaMedicamentos": true,
 *                       "traeMedicamentos": true,
 *                       "idUsuarioCreacion": 1
 *                     }
 *                   ]
 *               firma:
 *                 type: string
 *                 format: binary
 *                 description: Archivo de imagen de firma (PNG). **Solo se admiten archivos PNG.**
 *     responses:
 *       201:
 *         description: Todas las personas fueron registradas correctamente
 *       207:
 *         description: Algunas personas se registraron con éxito, otras fallaron
 *       400:
 *         description: Datos mal formateados
 *       500:
 *         description: Error interno del servidor
 */
router.post("/", upload.single("firma"), personasController.postPersonas);

/**
 * @swagger
 * /api/personas:
 *   put:
 *     tags:
 *       - Personas
 *     summary: Actualizar información de una persona
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - idFamilia
 *               - nombre
 *               - primerApellido
 *               - segundoApellido
 *               - tipoIdentificacion
 *               - numIdentificacion
 *               - nacionalidad
 *               - parentesco
 *               - fechaNacimiento
 *               - genero
 *               - sexo
 *               - telefono
 *               - idCondicionesEspeciales
 *               - idCondicionesPoblacionales
 *               - idFirma
 *               - contactoEmergencia
 *               - observaciones
 *               - idUsuarioCreacion
 *               - fechaCreacion
 *               - idUsuarioModificacion
 *               - fechaMofificacion
 *             properties:
 *               id: { type: integer }
 *               idFamilia: { type: string }
 *               nombre: { type: string }
 *               primerApellido: { type: string }
 *               segundoApellido: { type: string }
 *               tipoIdentificacion: { type: string }
 *               numIdentificacion: { type: string }
 *               nacionalidad: { type: string }
 *               parentesco: { type: string }
 *               fechaNacimiento: { type: string, format: date }
 *               genero: { type: string }
 *               sexo: { type: string }
 *               telefono: { type: string }
 *               idCondicionesEspeciales: { type: integer }
 *               idCondicionesPoblacionales: { type: integer }
 *               idFirma: { type: integer }
 *               contactoEmergencia: { type: string }
 *               observaciones: { type: string }
 *               idUsuarioCreacion: { type: integer }
 *               fechaCreacion: { type: string, format: date-time }
 *               idUsuarioModificacion: { type: integer }
 *               fechaMofificacion: { type: string, format: date-time }
 *     responses:
 *       200:
 *         description: Persona actualizada correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
// router.put('/', personasController.putPersona);

/**
 * @swagger
 * /api/personas/id/{id}:
 *   delete:
 *     tags:
 *       - Personas
 *     summary: Eliminar persona por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Persona eliminada correctamente
 *       500:
 *         description: Error al eliminar persona (Contactar equipo de API)
 */
router.delete('/id/:id', personasController.deletePersona);

/**
 * @swagger
 * /api/personas/resumen/porAlbergue/{nombreAlbergue}:
 *   get:
 *     tags:
 *       - Resumenes
 *     summary: Obtener resumen de personas por albergue
 *     description: Devuelve un resumen con las personas asociadas a un albergue específico.
 *     parameters:
 *       - in: path
 *         name: nombreAlbergue
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del albergue para obtener el resumen de personas.
 *         example: 12
 *     responses:
 *       200:
 *         description: Resumen de personas obtenido exitosamente.
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
 *                       idPersona:
 *                         type: integer
 *                         example: 45
 *                       nombre:
 *                         type: string
 *                         example: Juan Pérez
 *                       edad:
 *                         type: integer
 *                         example: 34
 *                       genero:
 *                         type: string
 *                         example: Masculino
 *       400:
 *         description: Parámetro idAlberguePersona no proporcionado.
 *       404:
 *         description: No se encontraron personas para el albergue especificado.
 *       500:
 *         description: Error interno al obtener el resumen de personas.
 */
router.get('/resumen/porAlbergue/:nombreAlbergue', personasController.getResumenPersonasPorAlbergue);

/**
 * @swagger
 * /api/personas/resumen/sexo:
 *   get:
 *     tags:
 *       - Resumenes
 *     summary: Obtener resumen de personas por sexo
 *     description: Devuelve un resumen de personas en un albergue agrupadas por sexo.
 *     parameters:
 *       - in: query
 *         name: idAlbergue
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del albergue
 *       - in: query
 *         name: sexo
 *         required: true
 *         schema:
 *           type: string
 *           example: "M"
 *         description: Código de sexo ("M" para masculino, "F" para femenino)
 *     responses:
 *       200:
 *         description: Resumen de personas por sexo obtenido correctamente
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
 *                       sexo:
 *                         type: string
 *                         example: "M"
 *                       cantidad:
 *                         type: integer
 *                         example: 120
 *       400:
 *         description: Faltan parámetros obligatorios (idAlbergue o sexo)
 *       500:
 *         description: Error interno al obtener el resumen
 */
router.get('/resumen/sexo', personasController.getResumenPersonasPorSexo);

/**
 * @swagger
 * /api/personas/resumen/edad:
 *   get:
 *     tags:
 *       - Resumenes
 *     summary: Obtener resumen de personas por edad
 *     description: Devuelve un resumen de personas en un albergue dentro de un rango de edad.
 *     parameters:
 *       - in: query
 *         name: idAlbergue
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del albergue
 *       - in: query
 *         name: edadMin
 *         required: true
 *         schema:
 *           type: integer
 *           example: 18
 *         description: Edad mínima del rango
 *       - in: query
 *         name: edadMax
 *         required: true
 *         schema:
 *           type: integer
 *           example: 35
 *         description: Edad máxima del rango
 *     responses:
 *       200:
 *         description: Resumen de personas por edad obtenido correctamente
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
 *                       edad:
 *                         type: integer
 *                         example: 25
 *                       cantidad:
 *                         type: integer
 *                         example: 12
 *       400:
 *         description: Faltan parámetros obligatorios
 *       500:
 *         description: Error interno al obtener el resumen
 */
router.get('/resumen/edad', personasController.getResumenPersonasPorEdad);

/**
 * @swagger
 * /api/personas/recursos/{idPersona}:
 *   get:
 *     tags:
 *       - Personas
 *     summary: Obtener recursos por persona
 *     description: Devuelve una lista de recursos asociados a la persona especificada.
 *     parameters:
 *       - in: path
 *         name: idPersona
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la persona
 *     responses:
 *       200:
 *         description: Lista de recursos encontrados
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
 *                     example:
 *                       idRecurso: 12
 *                       nombre: "Colchoneta"
 *                       cantidad: 3
 *       400:
 *         description: No se envió el parámetro idPersona
 *       404:
 *         description: No se encontraron recursos con la persona especificada
 *       500:
 *         description: Error interno al obtener los recursos
 */
router.get('/recursos/:idPersona', personasController.getSelectRecursosPorPersona);

module.exports = router;