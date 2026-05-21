const {Router}=require('express');
const usuarioController=require('../controllers/usuarioController');
const router=Router();

  /**
 * @swagger
 * /api/usuarios:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 *       500:
 *         description: Error al obtener usuarios (Contactar equipo de API)
 */
router.get('/all', usuarioController.getAllUsuarios);

  /**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     tags:
 *       - Usuarios
 *     summary: Obtener un usuario por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener usuario (Contactar equipo de API)
 */
router.get('/:id',   usuarioController.getUsuario);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Insertar un nuevo usuario
 *     description: Inserta un nuevo usuario en el sistema utilizando el procedimiento almacenado `pa_InsertUsuario`.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombreUsuario
 *               - correo
 *               - contrasenaHash
 *               - rol
 *               - activo
 *               - idMunicipalidad
 *               - identificacion
 *             properties:
 *               nombreUsuario:
 *                 type: string
 *               correo:
 *                 type: string
 *                 format: email
 *               contrasenaHash:
 *                 type: string
 *               rol:
 *                 type: string
 *               activo:
 *                 type: boolean
 *               idMunicipalidad:
 *                 type: integer
 *               identificacion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario insertado correctamente
 *       400:
 *         description: Solicitud incorrecta. Faltan datos obligatorios o hay un error de validación.
 *       500:
 *         description: Error interno al insertar usuario (Contactar equipo de API).
 */
router.post('/',  usuarioController.postUsuario);

/**
 * @swagger
 * /api/usuarios/contrasena:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Actualizar la contraseña de un usuario
 *     security: []  # Sin autenticación requerida
 */
router.put('/contrasena', usuarioController.putContrasenaMethod);

/**
 * @swagger
 * /api/usuarios/validar/correo:
 *   post:
 *     tags:
 *       - Usuarios
 *     summary: Validar si el correo ya está en uso
 *     security: []  # Sin autenticación requerida
 */
router.post('/validar/correo', usuarioController.validarCorreoMethod);

/**
 * @swagger
 * /api/usuarios:
 *   put:
 *     tags:
 *       - Usuarios
 *     summary: Actualizar un usuario existente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - nombreUsuario
 *               - correo
 *               - contrasenaHash
 *               - rol
 *               - activo
 *               - idMunicipalidad
 *               - identificacion
 *             properties:
 *               id:
 *                 type: integer
 *               nombreUsuario:
 *                 type: string
 *               correo:
 *                 type: string
 *               contrasenaHash:
 *                 type: string
 *               rol:
 *                 type: string
 *               activo:
 *                 type: boolean
 *               idMunicipalidad:
 *                 type: integer
 *               identificacion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       400:
 *         description: Datos faltantes
 *       500:
 *         description: Error al actualizar usuario (Contactar equipo de API)
 */
// router.put('/',  usuarioController.putUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     tags:
 *       - Usuarios
 *     summary: Eliminar un usuario por su ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario a eliminar
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       400:
 *         description: ID no proporcionado
 *       500:
 *         description: Error al eliminar usuario (Contactar equipo de API)
 */
router.delete('/:id', usuarioController.deleteUsuario);


module.exports=router;