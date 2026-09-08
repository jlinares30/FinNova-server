import { Router } from 'express';
import { generarPlanPago, getPlanesPagosByUser, getPlanPagoById, eliminarPlanPago, obtenerCuotasPorPlan } from '../controllers/planPagos.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Planes de Pago
 *   description: Generación, consulta y gestión de cronogramas y planes de pago
 */

/**
 * @openapi
 * /api/plan-pagos:
 *   post:
 *     summary: Generar un nuevo cronograma y plan de pagos francés
 *     tags: [Planes de Pago]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - entidadFinancieraId
 *               - localId
 *               - moneda
 *               - precioVenta
 *               - porcentajeCuotaInicial
 *               - plazoAnios
 *               - tipoTasa
 *               - valorTasa
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               entidadFinancieraId:
 *                 type: integer
 *                 example: 1
 *               localId:
 *                 type: integer
 *                 example: 1
 *               moneda:
 *                 type: string
 *                 example: PEN
 *               precioVenta:
 *                 type: number
 *                 example: 150000
 *               porcentajeCuotaInicial:
 *                 type: number
 *                 example: 20
 *               plazoAnios:
 *                 type: integer
 *                 example: 10
 *               frecuenciaPago:
 *                 type: string
 *                 example: MENSUAL
 *               tipoTasa:
 *                 type: string
 *                 example: EFECTIVA
 *               valorTasa:
 *                 type: number
 *                 example: 12.5
 *               periodoCapitalizacion:
 *                 type: string
 *                 example: MENSUAL
 *               plazoGracia:
 *                 type: integer
 *                 example: 0
 *               tipoGracia:
 *                 type: string
 *                 example: SIN_GRACIA
 *               tasaDescuento:
 *                 type: number
 *                 example: 10
 *               bonoFmv:
 *                 type: number
 *                 example: 0
 *     responses:
 *       200:
 *         description: Plan de pagos generado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Plan de pagos generado correctamente
 *                 plan:
 *                   $ref: '#/components/schemas/PlanPago'
 *                 cuotas:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Cuota'
 *                 indicadores:
 *                   $ref: '#/components/schemas/IndicadorFinanciero'
 *       400:
 *         description: Datos inválidos o errores de validación
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno al generar plan de pago
 */
router.post('/', authMiddleware, generarPlanPago);

/**
 * @openapi
 * /api/plan-pagos/user/{userId}:
 *   get:
 *     summary: Obtener todos los planes de pago de un usuario
 *     tags: [Planes de Pago]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de planes de pago del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlanPago'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno en el servidor
 */
router.get('/user/:userId', authMiddleware, getPlanesPagosByUser);

/**
 * @openapi
 * /api/plan-pagos/{id}:
 *   get:
 *     summary: Obtener detalle completo de un plan de pagos por ID
 *     tags: [Planes de Pago]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del plan de pagos
 *     responses:
 *       200:
 *         description: Detalle completo del plan de pagos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlanPago'
 *       404:
 *         description: Plan de pago no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno en el servidor
 */
router.get('/:id', authMiddleware, getPlanPagoById);

/**
 * @openapi
 * /api/plan-pagos/{id}:
 *   delete:
 *     summary: Eliminar un plan de pagos y sus registros asociados (cuotas e indicadores)
 *     tags: [Planes de Pago]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del plan a eliminar
 *     responses:
 *       200:
 *         description: Plan de pago eliminado correctamente
 *       404:
 *         description: Plan de pago no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
router.delete('/:id', authMiddleware, eliminarPlanPago);

/**
 * @openapi
 * /api/plan-pagos/{id}/cuotas:
 *   get:
 *     summary: Obtener el cronograma de cuotas de un plan
 *     tags: [Planes de Pago]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del plan
 *     responses:
 *       200:
 *         description: Lista de cuotas del cronograma
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cuota'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error interno
 */
router.get('/:id/cuotas', authMiddleware, obtenerCuotasPorPlan);

export default router;
