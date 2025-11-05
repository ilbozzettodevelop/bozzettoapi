const express = require('express');
const path = require('path');
// 1. IMPORTAR LA LIBRERÍA CORS
const cors = require('cors');

// Importa las rutas base (donde definiremos las APIs)
const baseRoutes = require('./routes/base.routes'); 

// Crea la instancia de la aplicación Express
const app = express();

/**
 * @function setupGlobalMiddleware
 * @description Configura los middlewares globales para toda la aplicación.
 */
const setupGlobalMiddleware = () => {
    
    // 2. CONFIGURACIÓN DE CORS
    // Esto permite que tu frontend (ej. localhost:8080 o tu-dominio.com)
    // pueda enviar solicitudes a esta API (localhost:3000).
    app.use(cors({
        // IMPORTANTE: '*' permite cualquier origen (fácil para desarrollo)
        // Reemplaza con tu dominio de producción para más seguridad (ej: 'https://www.bozzetto.com')
        origin: '*', 
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    }));
    
    // Middleware para parsear cuerpos de solicitud en JSON
    app.use(express.json()); 
    
    // Middleware para parsear datos de formularios (x-www-form-urlencoded)
    app.use(express.urlencoded({ extended: true }));
};

/**
 * @function setupStaticRoutes
 * @description Configura la ruta de archivos estáticos o de verificación.
 */
const setupStaticRoutes = () => {
    // Ruta GET /: Muestra una página HTML de verificación de estado
    app.get('/', (req, res) => {
        res.setHeader('Content-Type', 'text/html');
        res.status(200).send(`
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Verificación de API - Bozzetto</title>
                <style>
                    body { font-family: sans-serif; text-align: center; padding: 50px; background-color: #f4f4f9; color: #333; }
                    .container { background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); max-width: 600px; margin: auto; }
                    h1 { color: #2ecc71; }
                    p { font-size: 1.1em; }
                    code { background-color: #eee; padding: 2px 5px; border-radius: 3px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>🚀 Bozzetto API - Servidor Operativo</h1>
                    <p>El servidor Express está en ejecución correctamente.</p>
                    <p>Esta es la ruta raíz de verificación (<code>/</code>).</p>
                    <p>Las rutas funcionales de la API se encuentran en este link <code>/api/</code>.</p>
                </div>
            </body>
            </html>
        `);
    });
};

/**
 * @function setupRoutes
 * @description Define y utiliza todas las rutas de la aplicación.
 */
const setupRoutes = () => {
    // Las rutas de nuestra API irán bajo el prefijo '/api'
    app.use('/api', baseRoutes); 
};

/**
 * @function setupErrorHandling
 * @description Configura el middleware de manejo de errores. 
 */
const setupErrorHandling = () => {
    // 404: Ruta no encontrada. Debe ir después de todas las demás rutas.
    app.use((req, res, next) => {
        const error = new Error(`No se encontró la ruta ${req.originalUrl}`);
        error.statusCode = 404; // Código de estado HTTP para "Not Found"
        next(error); // Pasa el error al siguiente manejador de errores
    });

    // Manejador de Errores Global (Recibe el error pasado por 'next(error)')
    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500; // Usa el código del error o 500 (Internal Server Error)
        const message = err.message || 'Error interno no especificado del servidor.';

        // Registra el error completo en la consola del servidor (para debugging)
        console.error(`[ERROR ${statusCode}]: ${req.method} ${req.originalUrl} - ${err.stack}`); 

        // Envía la respuesta al cliente
        res.status(statusCode).json({
            success: false,
            error: {
                statusCode,
                message,
                // En producción, evita enviar 'stack' para seguridad.
                // stack: process.env.NODE_ENV === 'development' ? err.stack : undefined 
            }
        });
    });
};


// ------------------------------------
// APLICACIÓN: Ejecución de la Configuración
// ------------------------------------

setupGlobalMiddleware();
setupStaticRoutes();
setupRoutes();
setupErrorHandling();

// Exporta la instancia de app para ser usada en server.js
module.exports = app;