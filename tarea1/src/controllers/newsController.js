const axios = require('axios');
const config = require('../config/config');

// Verificar que tenemos API KEY
if (!config.apiKey) {
    console.error('ERROR: API KEY no encontrada. Asegúrate de configurar NEWS_API_KEY en el archivo .env');
}

const newsController = {
    // Obtener lista de fuentes
    getSources: async (req, res) => {
        try {
            console.log('API Key being used:', config.apiKey); // Para debugging
            const response = await axios.get(`${config.newsApiUrl}/sources`, {
                headers: {
                    'X-Api-Key': config.apiKey
                },
                params: req.query
            });
            res.json(response.data);
        } catch (error) {
            console.error('Error en getSources:', error.response?.data || error.message);
            res.status(error.response?.status || 500).json({
                error: error.response?.data?.message || error.message,
                status: error.response?.status
            });
        }
    },

    // Obtener top headlines
    getTopHeadlines: async (req, res) => {
        try {
            console.log('API Key being used:', config.apiKey); // Para debugging
            const response = await axios.get(`${config.newsApiUrl}/top-headlines`, {
                headers: {
                    'X-Api-Key': config.apiKey
                },
                params: req.query
            });
            res.json(response.data);
        } catch (error) {
            console.error('Error en getTopHeadlines:', error.response?.data || error.message);
            res.status(error.response?.status || 500).json({
                error: error.response?.data?.message || error.message,
                status: error.response?.status
            });
        }
    },

    // Buscar noticias
    getEverything: async (req, res) => {
        try {
            console.log('API Key being used:', config.apiKey); // Para debugging
            const response = await axios.get(`${config.newsApiUrl}/everything`, {
                headers: {
                    'X-Api-Key': config.apiKey
                },
                params: req.query
            });
            res.json(response.data);
        } catch (error) {
            console.error('Error en getEverything:', error.response?.data || error.message);
            res.status(error.response?.status || 500).json({
                error: error.response?.data?.message || error.message,
                status: error.response?.status
            });
        }
    }
};

module.exports = newsController;