const { Router } = require('express');
const router = Router();
const firmasController = require('../controllers/firmasController');
const { rutaInvalida } = require('../src/helpers/bloqueos');

/**
 * @swagger
 * /api/firmasDigitales/id/{id}:
 *   get:
 *     tags:
 *       - FirmasDigitales
 *     summary: Obtener una firma digital por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la firma
 *     responses:
 *       200:
 *         description: Firma obtenida correctamente
 *       400:
 *         description: Falta el ID
 *       404:
 *         description: Firma no encontrada
 *       500:
 *         description: Error interno del servidor (Contactar con equipo de API)
 */
router.get('/id/:id', firmasController.getMethod);

/**
 * @swagger
 * /api/firmasDigitales/all:
 *   get:
 *     tags:
 *       - FirmasDigitales
 *     summary: Obtener todas las firmas digitales
 *     responses:
 *       200:
 *         description: Lista de firmas obtenida correctamente
 *       500:
 *         description: Error al obtener firmas (Contactar equipo de API)
 */
router.get('/all', firmasController.getAllMethod);

router.post('/', rutaInvalida);

router.put('/', rutaInvalida);

router.delete('/id/:id', rutaInvalida);

module.exports = router;