// server/routes/help.js
const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../middleware/authMiddleware');

// Guardar consulta de usuario
router.post('/contact', authenticateToken, async (req, res) => {
    const { name, email, message } = req.body;
    try {
        // Aquí guardaríamos el mensaje en la base de datos
        // Ejemplo de guardar: const newMessage = new Contact({ name, email, message });
        // await newMessage.save();

        res.status(200).json({ message: 'Consulta enviada correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al enviar consulta', error });
    }
});

module.exports = router;
