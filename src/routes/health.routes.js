import { Router } from "express";

const router = Router();

/**
 * @openapi
 * tags:
 *   name: Health
 *   description: Verificación del estado del servicio
 */

/**
 * @openapi
 * /api/health:
 *   get:
 *     summary: Health check endpoint
 *     description: Endpoint liviano utilizado para mantener activo el backend y verificar su disponibilidad.
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Servicio funcionando correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 timestamp:
 *                   type: string
 *                   format: date-time
 *                 uptime:
 *                   type: number
 *                   description: Segundos que el proceso lleva activo
 */
router.get("/", (req, res) => {
  res.status(200).json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

export default router;
