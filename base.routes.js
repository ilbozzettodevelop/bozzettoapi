const express = require('express');

// Crea un router específico para las rutas bajo /api
const router = express.Router();

/**
 * @function testRoute
 * @description Ruta de prueba básica para verificar que la API está respondiendo en /api/test.
 * @param {object} req - Objeto de solicitud de Express.
 * @param {object} res - Objeto de respuesta de Express.
 * @param {function} next - Función para pasar el control al siguiente middleware.
 */
router.get('/test', (req, res, next) => {
    // Respuesta exitosa (200 OK) en formato JSON
    res.status(200).json({
        success: true,
        message: 'API está operativa y lista para recibir módulos.',
        version: '1.0.0'
    });
});

// Más adelante, aquí importaríamos las rutas de email:
// router.use('/email', emailRoutes);

module.exports = router;