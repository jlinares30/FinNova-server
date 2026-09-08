import { Router } from 'express';
import { getAllEntidades, getEntidadById, createEntidad, updateEntidad, removeEntidad } from '../controllers/entidadFinanciera.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Entidad Financiera
 *   description: Operaciones CRUD para entidades financieras y sus condiciones crediticias
 */

/**
 * @openapi
 * /api/entidad:
 *   get:
 *     summary: Obtener todas las entidades financieras
 *     tags: [Entidad Financiera]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de entidades financieras
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EntidadFinanciera'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.get('/', authMiddleware, getAllEntidades);

/**
 * @openapi
 * /api/entidad/{id}:
 *   get:
 *     summary: Obtener una entidad financiera por ID
 *     tags: [Entidad Financiera]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la entidad
 *     responses:
 *       200:
 *         description: Entidad financiera encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EntidadFinanciera'
 *       404:
 *         description: Entidad financiera no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', authMiddleware, getEntidadById);

/**
 * @openapi
 * /api/entidad:
 *   post:
 *     summary: Crear una nueva entidad financiera
 *     tags: [Entidad Financiera]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - tipo_tasa
 *               - tasa_interes
 *               - tipo_tasa_interes
 *               - capitalizacion
 *               - moneda
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Interbank
 *               tipo_tasa:
 *                 type: string
 *                 example: EFECTIVA
 *               tasa_interes:
 *                 type: number
 *                 example: 11.8
 *               tipo_tasa_interes:
 *                 type: string
 *                 example: ANUAL
 *               capitalizacion:
 *                 type: string
 *                 example: MENSUAL
 *               plazo_gracia:
 *                 type: integer
 *                 example: 3
 *               tipo_gracia:
 *                 type: string
 *                 example: PARCIAL
 *               costo_notarial:
 *                 type: number
 *                 example: 250
 *               costo_registral:
 *                 type: number
 *                 example: 180
 *               tasacion:
 *                 type: number
 *                 example: 300
 *               comision_estudio:
 *                 type: number
 *                 example: 80
 *               comision_activacion:
 *                 type: number
 *                 example: 40
 *               comision_periodica:
 *                 type: number
 *                 example: 15
 *               seguro_desgravamen:
 *                 type: number
 *                 example: 0.045
 *               seguro_riesgo:
 *                 type: number
 *                 example: 0.025
 *               tasa_descuento:
 *                 type: number
 *                 example: 9.5
 *               porcentaje_financiamiento_max:
 *                 type: number
 *                 example: 85
 *               moneda:
 *                 type: string
 *                 example: PEN
 *               plazo_maximo_meses:
 *                 type: integer
 *                 example: 300
 *               plazo_minimo_meses:
 *                 type: integer
 *                 example: 12
 *               activo:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Entidad financiera creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EntidadFinanciera'
 *       400:
 *         description: Datos inválidos
 *       401:
 *         description: No autorizado
 */
router.post('/', authMiddleware, createEntidad);

/**
 * @openapi
 * /api/entidad/{id}:
 *   put:
 *     summary: Actualizar una entidad financiera
 *     tags: [Entidad Financiera]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la entidad financiera
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               tipo_tasa:
 *                 type: string
 *               tasa_interes:
 *                 type: number
 *               moneda:
 *                 type: string
 *     responses:
 *       200:
 *         description: Entidad financiera actualizada
 *       400:
 *         description: Error en los datos proporcionados
 *       401:
 *         description: No autorizado
 */
router.put('/:id', authMiddleware, updateEntidad);

/**
 * @openapi
 * /api/entidad/{id}:
 *   delete:
 *     summary: Desactivar o eliminar una entidad financiera
 *     tags: [Entidad Financiera]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la entidad
 *     responses:
 *       200:
 *         description: Entidad eliminada / desactivada correctamente
 *       400:
 *         description: Error al eliminar
 *       401:
 *         description: No autorizado
 */
router.delete('/:id', authMiddleware, removeEntidad);

export default router;
