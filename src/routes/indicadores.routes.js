import { Router } from 'express';
import { getIndicadoresByPlan, calcularIndicadores } from '../controllers/indicadorFinanciero.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Indicadores Financieros
 *   description: Métricas y evaluación financiera (VAN, TIR, TCEA, Duración, Convexidad)
 */

/**
 * @openapi
 * /api/indicador/{id}:
 *   get:
 *     summary: Obtener indicadores financieros calculados de un plan de pagos
 *     tags: [Indicadores Financieros]
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
 *         description: Indicadores financieros encontrados
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IndicadorFinanciero'
 *       404:
 *         description: No hay indicadores para este plan
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.get('/:id', authMiddleware, getIndicadoresByPlan);

/**
 * @openapi
 * /api/indicador/{id}:
 *   post:
 *     summary: Calcular y registrar indicadores financieros de un plan
 *     tags: [Indicadores Financieros]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del plan de pago
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - planId
 *               - tasa_descuento
 *               - valorInmueble
 *             properties:
 *               planId:
 *                 type: integer
 *                 example: 1
 *               tasa_descuento:
 *                 type: number
 *                 example: 10
 *               valorInmueble:
 *                 type: number
 *                 example: 150000
 *               bonoFmv:
 *                 type: number
 *                 example: 10000
 *     responses:
 *       201:
 *         description: Indicadores financieros calculados exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 indicadores:
 *                   $ref: '#/components/schemas/IndicadorFinanciero'
 *       400:
 *         description: No existen cuotas para el plan o datos incorrectos
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el cálculo
 */
router.post('/:id', authMiddleware, calcularIndicadores);

export default router;
