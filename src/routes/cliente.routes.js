import { Router } from 'express';
import { createSocioeconomico, getCompleteProfile, updateProfile, updateSocioeconomico } from '../controllers/cliente.controller.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Cliente
 *   description: Perfil del cliente e información socioeconómica
 */

/**
 * @openapi
 * /api/cliente/socioeconomico:
 *   post:
 *     summary: Registrar información socioeconómica
 *     tags: [Cliente]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ocupacion
 *               - ingresos_mensuales
 *               - tipo_contrato
 *               - nivel_educativo
 *               - userId
 *             properties:
 *               ocupacion:
 *                 type: string
 *                 example: Arquitecto
 *               ingresos_mensuales:
 *                 type: number
 *                 example: 5500
 *               tipo_contrato:
 *                 type: string
 *                 example: Planilla Indefinido
 *               nivel_educativo:
 *                 type: string
 *                 example: Universitario Completo
 *               userId:
 *                 type: integer
 *                 example: 1
 *     responses:
 *       201:
 *         description: Información socioeconómica guardada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 socioeconomico:
 *                   $ref: '#/components/schemas/Socioeconomico'
 *       500:
 *         description: Error en el servidor
 */
router.post('/socioeconomico', createSocioeconomico);

/**
 * @openapi
 * /api/cliente/profile/{userId}:
 *   get:
 *     summary: Obtener perfil completo del cliente autenticado
 *     tags: [Cliente]
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
 *         description: Perfil de usuario con información socioeconómica
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.get('/profile/:userId', authMiddleware, getCompleteProfile);

/**
 * @openapi
 * /api/cliente/profile/{userId}:
 *   put:
 *     summary: Actualizar datos personales del perfil
 *     tags: [Cliente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               dni:
 *                 type: string
 *               age:
 *                 type: integer
 *               gender:
 *                 type: string
 *               birthdate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Perfil actualizado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.put('/profile/:userId', authMiddleware, updateProfile);

/**
 * @openapi
 * /api/cliente/socioeconomico/{userId}:
 *   put:
 *     summary: Actualizar datos socioeconómicos del cliente
 *     tags: [Cliente]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               ocupacion:
 *                 type: string
 *               ingresos_mensuales:
 *                 type: number
 *               tipo_contrato:
 *                 type: string
 *               nivel_educativo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Información socioeconómica actualizada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error en el servidor
 */
router.put('/socioeconomico/:userId', authMiddleware, updateSocioeconomico);

export default router;
