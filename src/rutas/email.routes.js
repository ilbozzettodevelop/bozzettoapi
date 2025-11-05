const express = require('express');
const router = express.Router();
// ¡Asegúrate de que la ruta a email.controller.js sea correcta!
const emailController = require('../controllers/email.controller'); 

/**
 * @fileoverview Rutas API para la gestión de correo electrónico.
 */

/**
 * @route POST /send-form
 * @description Endpoint para recibir datos de un formulario de contacto y enviar el correo.
 * * La URL completa es: /api/email/send-form
 */
router.post('/send-form', emailController.sendContactForm);

module.exports = router;