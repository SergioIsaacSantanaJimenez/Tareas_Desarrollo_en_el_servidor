const dotenv = require('dotenv');
const path = require('path');

// Cargar variables de entorno
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const config = {
    apiKey: process.env.NEWS_API_KEY,
    newsApiUrl: 'https://newsapi.org/v2'
};

// Verificar configuración
if (!config.apiKey) {
    console.error('ERROR: NEWS_API_KEY no está configurada en el archivo .env');
}

module.exports = config;