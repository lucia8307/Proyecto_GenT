// server/routes/search.js
const express = require('express');
const Material = require('../models/Material'); // Asumiendo que tenemos un modelo para materiales
const router = express.Router();

// Ruta para búsqueda de materiales
router.get('/', async (req, res) => {
    const { query } = req.query;
    try {
        const results = await Material.find({ title: { $regex: query, $options: 'i' } });
        res.status(200).json(results);
    } catch (error) {
        res.status(500).json({ message: 'Error al buscar materiales', error });
    }
});

module.exports = router;
