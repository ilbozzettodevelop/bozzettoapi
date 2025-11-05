const transporter = require('../config/email.config');

/**
 * @fileoverview Controlador para la lógica de negocio del envío de correos.
 * @module controllers/email.controller
 */

/**
 * @description Función simple para crear un objeto Error personalizado.
 */
const CustomError = (message, statusCode = 500) => {
    const error = new Error(message);
    error.statusCode = statusCode;
    return error;
};

/**
 * @function sendContactForm
 * @description Controlador principal para recibir los datos de un formulario de contacto y enviar el correo.
 */
const sendContactForm = async (req, res, next) => {
    // 1. Obtención y Desestructuración de Datos
    const { nombre, email, mensaje, numero } = req.body;

    // 2. VALIDACIÓN DE DATOS (Manejo de Error 400 Bad Request)
    if (!nombre || !email || !mensaje) {
        // Pasa un error 400 (Bad Request)
        return next(CustomError('Faltan campos obligatorios: nombre, email y mensaje.', 400));
    }
    
    // 3. Creación de Opciones del Correo (mailOptions)
    const mailOptions = {
        // Remitente (desde el correo configurado en .env)
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_USER}>`, 
        // Destinatario (el correo que recibirá los formularios, desde .env)
        to: process.env.EMAIL_DESTINATION, 
        subject: `[Formulario] Mensaje de ${nombre}`,
        html: `
            <h3>Detalles del Contacto</h3>
            <p><strong>Remitente:</strong> ${nombre}</p>
            <p><strong>Correo Electrónico:</strong> ${email}</p>
            <hr>
            <p><strong>Número de Teléfono:</strong> ${numero}</p>
            <p><strong>Mensaje:</strong></p>
            <p style="white-space: pre-wrap;">${mensaje}</p> 
        `,
        // Permite responder directamente al correo del cliente
        replyTo: email 
    };

    // 4. Envío del Correo (Manejo de Error 503 Service Unavailable)
    try {
        const info = await transporter.sendMail(mailOptions);
        
        console.log('✅ Correo de formulario enviado con ID: %s', info.messageId);

        // Respuesta exitosa
        res.status(200).json({
            success: true,
            message: 'El formulario de contacto se ha enviado correctamente.',
        });

    } catch (error) {
        console.error('❌ Error al enviar el correo (Nodemailer):', error);
        
        // Pasa un error 503 (Service Unavailable)
        return next(CustomError('El servicio de correo no está disponible en este momento. Verifique la configuración SMTP.', 503));
    }
};

module.exports = {
    sendContactForm,
};