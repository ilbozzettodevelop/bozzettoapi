// src/server.js (CÓDIGO FINAL CORREGIDO Y LIMPIO)

// Carga las variables de entorno del archivo .env
require('dotenv').config(); 

// Importa la aplicación Express configurada desde 'app.js'
const app = require('./app'); 

// Establece el puerto: usa la variable de entorno (si existe) o el valor por defecto 3000
const PORT = process.env.PORT || 3000; 

// *** TU IP LOCAL (USADA SOLO PARA MOSTRAR AL USUARIO REMOTO) ***
// Esta es la IP que la otra PC usará. Solo para fines informativos en consola.
const LAN_IP = '192.168.68.136'; 

/**
 * @function startServer
 * @description Inicia la aplicación Express en el puerto configurado.
 */
const startServer = () => {
    // 1. app.listen debe recibir SOLAMENTE el número de puerto (PORT).
    const server = app.listen(PORT, () => { 
        
        // 2. Mensajes de consola con el puerto NUMÉRICO correcto
        console.log(`✅ Servidor en funcionamiento: API escuchando en el puerto ${PORT}`);
        console.log(`🌐 URL Localhost (solo esta PC): http://localhost:${PORT}`);
        // 3. Informar la URL para la PC remota.
        console.log(`🌐 URL de Red Local (para PC remota): http://${LAN_IP}:${PORT}/api/email/send-form`);
    });

    // Manejo de errores del servidor (ej. si el puerto ya está en uso)
    server.on('error', (error) => {
        if (error.code === 'EADDRINUSE') {
            console.error(`❌ Error: El puerto ${PORT} ya está en uso. Intente con otro puerto.`);
        } else {
            console.error('❌ Error desconocido al iniciar el servidor:', error);
        }
        process.exit(1);
    });
};

// Llama a la función para iniciar el servidor
startServer();