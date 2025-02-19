const express = require('express');
const router = express.Router();
const newsController = require('../controllers/newsController');

// Ruta para obtener fuentes
router.get('/sources', newsController.getSources);

// Ruta para obtener top headlines
router.get('/top-headlines', newsController.getTopHeadlines);

// Ruta para buscar noticias
router.get('/everything', newsController.getEverything);

module.exports = router;