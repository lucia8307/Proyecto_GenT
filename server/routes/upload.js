// server/routes/upload.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

// Configurar multer para almacenar archivos subidos
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Ruta para subir archivos
router.post('/', upload.single('file'), (req, res) => {
    try {
        res.status(200).json({ message: 'Archivo subido exitosamente', file: req.file });
    } catch (error) {
        res.status(500).json({ message: 'Error al subir archivo', error });
    }
});

module.exports = router;
