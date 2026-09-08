import { Router } from 'express';
import { getEntidadesFinancieras, getLocales, getLocalById, createLocal, updateLocal } from '../controllers/catalogo.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Catalogo
 *   description: Catálogo de entidades financieras y locales comerciales
 */

/**
 * @openapi
 * /api/catalogo/entidades-financieras:
 *   get:
 *     summary: Obtener entidades financieras activas
 *     tags: [Catalogo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: moneda
 *         schema:
 *           type: string
 *         description: Filtrar por moneda (PEN o USD)
 *     responses:
 *       200:
 *         description: Lista de entidades financieras obtenida correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 entidades:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/EntidadFinanciera'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.get('/entidades-financieras', authMiddleware, getEntidadesFinancieras);

/**
 * @openapi
 * /api/catalogo/locales:
 *   get:
 *     summary: Obtener lista de locales comerciales
 *     tags: [Catalogo]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de locales
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 locales:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Local'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.get('/locales', authMiddleware, getLocales);

/**
 * @openapi
 * /api/catalogo/locales:
 *   post:
 *     summary: Crear un nuevo local comercial
 *     tags: [Catalogo]
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
 *               - precio
 *               - tipo
 *               - direccion
 *               - sueldo_minimo
 *               - moneda
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Local San Isidro
 *               precio:
 *                 type: number
 *                 example: 220000
 *               tipo:
 *                 type: string
 *                 example: Comercial
 *               direccion:
 *                 type: string
 *                 example: Av. Javier Prado 1000
 *               sueldo_minimo:
 *                 type: number
 *                 example: 5000
 *               imagen_url:
 *                 type: string
 *                 example: https://images.unsplash.com/photo-1
 *               moneda:
 *                 type: string
 *                 example: PEN
 *     responses:
 *       201:
 *         description: Local creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 local:
 *                   $ref: '#/components/schemas/Local'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.post('/locales', authMiddleware, createLocal);

/**
 * @openapi
 * /api/catalogo/locales/{id}:
 *   get:
 *     summary: Obtener detalle de un local con sus costos asociados
 *     tags: [Catalogo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del local
 *     responses:
 *       200:
 *         description: Detalle del local
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 local:
 *                   $ref: '#/components/schemas/Local'
 *       404:
 *         description: Local no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.get('/locales/:id', authMiddleware, getLocalById);

/**
 * @openapi
 * /api/catalogo/locales/{id}:
 *   put:
 *     summary: Actualizar un local comercial y sus costos iniciales/periódicos
 *     tags: [Catalogo]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del local
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *               precio:
 *                 type: number
 *               tipo:
 *                 type: string
 *               direccion:
 *                 type: string
 *               sueldo_minimo:
 *                 type: number
 *               imagen_url:
 *                 type: string
 *               moneda:
 *                 type: string
 *               CostoInicial:
 *                 type: object
 *               CostoPeriodico:
 *                 type: object
 *     responses:
 *       200:
 *         description: Local actualizado correctamente
 *       404:
 *         description: Local no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.put('/locales/:id', authMiddleware, updateLocal);

export default router;
