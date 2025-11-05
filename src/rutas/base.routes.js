const express = require('express');

// Importa las rutas del módulo de correo (¡Necesario para montar!)
const emailRoutes = require('./email.routes'); 

// Crea un router específico para las rutas bajo /api
const router = express.Router();

/**
 * @function testRoute
 * @description Ruta de prueba básica para verificar que la API está respondiendo en /api/test.
 */
router.get('/test', (req, res, next) => {
    // Respuesta exitosa (200 OK) en formato JSON
    res.status(200).json({
        success: true,
        message: 'API está operativa y lista para recibir módulos.',
        version: '1.0.0'
    });
});

// ------------------------------------------------------------------
// INTEGRACIÓN DE MÓDULOS DE API (SOLUCIÓN al ERROR 404)
// ------------------------------------------------------------------

/**
 * @description Monta el módulo de gestión de correo bajo el prefijo '/email'.
 * @route Prefijo: /api/email
 */
router.use('/email', emailRoutes);

module.exports = router;