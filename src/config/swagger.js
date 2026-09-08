import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { ENV } from './env.js';

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Finanzas App API',
      version: '1.0.0',
      description: 'Documentación de la API de Finanzas App para gestión de créditos, cálculo de cuotas, indicadores financieros (VAN, TIR, TCEA), locales y clientes.',
      contact: {
        name: 'Soporte Finanzas App'
      }
    },
    servers: [
      {
        url: `http://localhost:${ENV.PORT || 4000}`,
        description: 'Servidor Local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Introduce tu token JWT en el formato: Bearer {token}'
        }
      },
      schemas: {
        User: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            name: { type: 'string', example: 'Juan Perez' },
            email: { type: 'string', format: 'email', example: 'juan@example.com' },
            gender: { type: 'string', example: 'Masculino' },
            birthdate: { type: 'string', format: 'date', example: '1995-05-15' },
            age: { type: 'integer', example: 30 },
            dni: { type: 'string', example: '12345678' }
          }
        },
        Socioeconomico: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            ocupacion: { type: 'string', example: 'Ingeniero de Software' },
            ingresos_mensuales: { type: 'number', example: 4500.00 },
            tipo_contrato: { type: 'string', example: 'Indefinido' },
            nivel_educativo: { type: 'string', example: 'Universitario' },
            userId: { type: 'integer', example: 1 }
          }
        },
        Local: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nombre: { type: 'string', example: 'Local Comercial Centro' },
            precio: { type: 'number', example: 150000.00 },
            tipo: { type: 'string', example: 'Comercial' },
            direccion: { type: 'string', example: 'Av. Larco 123' },
            sueldo_minimo: { type: 'number', example: 3000.00 },
            imagen_url: { type: 'string', example: 'https://images.unsplash.com/photo-1' },
            moneda: { type: 'string', example: 'PEN' }
          }
        },
        EntidadFinanciera: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            nombre: { type: 'string', example: 'Banco BCP' },
            tipo_tasa: { type: 'string', example: 'EFECTIVA' },
            tasa_interes: { type: 'number', example: 12.5 },
            tipo_tasa_interes: { type: 'string', example: 'ANUAL' },
            capitalizacion: { type: 'string', example: 'MENSUAL' },
            plazo_gracia: { type: 'integer', example: 6 },
            tipo_gracia: { type: 'string', example: 'TOTAL' },
            costo_notarial: { type: 'number', example: 300 },
            costo_registral: { type: 'number', example: 150 },
            tasacion: { type: 'number', example: 250 },
            comision_estudio: { type: 'number', example: 100 },
            comision_activacion: { type: 'number', example: 50 },
            comision_periodica: { type: 'number', example: 10 },
            seguro_desgravamen: { type: 'number', example: 0.05 },
            seguro_riesgo: { type: 'number', example: 0.03 },
            tasa_descuento: { type: 'number', example: 10 },
            porcentaje_financiamiento_max: { type: 'number', example: 80 },
            moneda: { type: 'string', example: 'PEN' },
            plazo_maximo_meses: { type: 'integer', example: 240 },
            plazo_minimo_meses: { type: 'integer', example: 12 },
            activo: { type: 'boolean', example: true }
          }
        },
        Cuota: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            numero: { type: 'integer', example: 1 },
            saldoInicial: { type: 'number', example: 100000 },
            interes: { type: 'number', example: 1000 },
            cuotaFija: { type: 'number', example: 2500 },
            amortizacion: { type: 'number', example: 1500 },
            seguroDesgravamen: { type: 'number', example: 50 },
            seguroRiesgo: { type: 'number', example: 30 },
            comision: { type: 'number', example: 10 },
            cuotaTotal: { type: 'number', example: 2590 },
            saldoFinal: { type: 'number', example: 98500 },
            flujo: { type: 'number', example: -2590 },
            planId: { type: 'integer', example: 1 }
          }
        },
        IndicadorFinanciero: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            planId: { type: 'integer', example: 1 },
            tasa_descuento: { type: 'number', example: 10 },
            van: { type: 'number', example: 12500.50 },
            tir: { type: 'number', example: 14.2 },
            tcea_real: { type: 'number', example: 15.1 },
            tcea_cliente: { type: 'number', example: 15.6 },
            duracion: { type: 'number', example: 4.8 },
            convexidad: { type: 'number', example: 28.5 },
            interesesTotales: { type: 'number', example: 35000 },
            costoTotalPrestamo: { type: 'number', example: 135000 },
            segurosTotales: { type: 'number', example: 4800 },
            costoPeriodicoTotal: { type: 'number', example: 1200 },
            relacionPagoVsInmueble: { type: 'number', example: 1.35 },
            impactoBono: { type: 'number', example: 0.1 }
          }
        },
        PlanPago: {
          type: 'object',
          properties: {
            id: { type: 'integer', example: 1 },
            userId: { type: 'integer', example: 1 },
            localId: { type: 'integer', example: 1 },
            entidadFinancieraId: { type: 'integer', example: 1 },
            moneda: { type: 'string', example: 'PEN' },
            precioVenta: { type: 'number', example: 150000 },
            cuotaInicial: { type: 'number', example: 30000 },
            montoPrestamo: { type: 'number', example: 120000 },
            numeroCuotas: { type: 'integer', example: 120 },
            frecuenciaPago: { type: 'string', example: 'MENSUAL' },
            tipoTasa: { type: 'string', example: 'EFECTIVA' },
            tasaInteres: { type: 'number', example: 12.5 },
            capitalizacion: { type: 'string', example: 'MENSUAL' },
            plazoGracia: { type: 'integer', example: 0 },
            tipoGracia: { type: 'string', example: 'SIN_GRACIA' },
            tasaDescuento: { type: 'number', example: 10 }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string', example: 'Mensaje descriptivo del error' }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js', './index.js']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const setupSwagger = (app) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
};
