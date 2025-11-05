const nodemailer = require('nodemailer');

/**
 * @fileoverview Configuración centralizada para el servicio de envío de correos (Nodemailer).
 * @module config/email.config
 */
const transporter = nodemailer.createTransport({
    // Configuración específica de Hostinger/SMTP leída desde el .env
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    // secure debe ser 'true' para el puerto 465 (SSL/TLS)
    secure: process.env.EMAIL_SECURE === 'true', 
    auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS  
    },
    // Configuración TLS para evitar problemas de certificación comunes
    tls: {
        rejectUnauthorized: false
    }
});

/**
 * @function verifyTransporter
 * @description Verifica la conexión del transportador de Nodemailer.
 */
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ ERROR de Configuración de Nodemailer (SMTP):', error.message);
        console.error('💡 Verifique: EMAIL_HOST, EMAIL_PORT, EMAIL_USER y EMAIL_PASS en el archivo .env.');
    } else {
        console.log('📬 Nodemailer listo para enviar correos.');
    }
});


// Exporta la instancia de transporter para ser utilizada por el controlador
module.exports = transporter;