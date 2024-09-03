const express = require('express');
const router = express.Router();
const userModel = require('../models/user');

// Obtener lista de usuarios
router.get('/', (req, res) => {
    res.json(userModel.getUsers());
});

// Crear un nuevo usuario
router.post('/', (req, res) => {
    const { name, email } = req.body;
    if (!name || !email) return res.status(400).json({ message: 'Nombre y correo electrónico son requeridos' });
    const newUser = userModel.createUser({ name, email });
    res.status(201).json(newUser);
});

// Obtener un usuario por ID
router.get('/:userId', (req, res) => {
    const user = userModel.getUserById(parseInt(req.params.userId));
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

// Actualizar un usuario existente
router.put('/:userId', (req, res) => {
    const user = userModel.updateUser(parseInt(req.params.userId), req.body);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

// Eliminar un usuario por ID
router.delete('/:userId', (req, res) => {
    const success = userModel.deleteUser(parseInt(req.params.userId));
    if (success) {
        res.status(204).end();
    } else {
        res.status(404).json({ message: 'Usuario no encontrado' });
    }
});

module.exports = router;
