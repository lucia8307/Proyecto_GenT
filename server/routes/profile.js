// server/routes/profile.js
const express = require('express');
const User = require('../models/User'); // Asumiendo que tenemos un modelo de usuario
const router = express.Router();

// Obtener perfil del usuario
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener perfil del usuario', error });
    }
});

// Actualizar perfil del usuario
router.put('/:id', async (req, res) => {
    const { username, email } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { username, email }, { new: true });
        if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.status(200).json({ message: 'Perfil actualizado exitosamente', user });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar perfil del usuario', error });
    }
});

module.exports = router;
