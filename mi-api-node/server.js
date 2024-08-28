const express = require('express');
const app = express();
const port = 3000;

// Middleware para parsear el body de las peticiones como JSON
app.use(express.json());

// Datos iniciales de personajes (base de datos simulada)
let personajes = [
    { id: 1, nombre: 'Naruto Uzumaki', anime: 'Naruto', habilidad: 'Rasengan' },
    { id: 2, nombre: 'Goku', anime: 'Dragon Ball', habilidad: 'Kamehameha' },
    { id: 3, nombre: 'Luffy', anime: 'One Piece', habilidad: 'Gomu Gomu no Mi' },
    { id: 4, nombre: 'Tanjiro', anime: 'Kimetsu no Yaiba', habilidad: 'Danza del fuego' }

];

// Rutas

// GET - Obtener todos los personajes
app.get('/api/personajes', (req, res) => {
    res.json(personajes);
});

// GET - Obtener un personaje por ID
app.get('/api/personajes/:id', (req, res) => {
    const personajeId = parseInt(req.params.id);
    const personaje = personajes.find(p => p.id === personajeId);
    if (personaje) {
        res.json(personaje);
    } else {
        res.status(404).json({ mensaje: 'Personaje no encontrado' });
    }
});

// POST - Crear un nuevo personaje
app.post('/api/personajes', (req, res) => {
    const nuevoPersonaje = req.body;
    nuevoPersonaje.id = personajes.length ? personajes[personajes.length - 1].id + 1 : 1;
    personajes.push(nuevoPersonaje);
    res.status(201).json({ mensaje: 'Personaje creado', personaje: nuevoPersonaje });
});

// PUT - Actualizar un personaje existente
app.put('/api/personajes/:id', (req, res) => {
    const personajeId = parseInt(req.params.id);
    const index = personajes.findIndex(p => p.id === personajeId);
    if (index !== -1) {
        personajes[index] = { ...personajes[index], ...req.body };
        res.json({ mensaje: `Personaje ${personajeId} actualizado`, personaje: personajes[index] });
    } else {
        res.status(404).json({ mensaje: 'Personaje no encontrado' });
    }
});

// DELETE - Eliminar un personaje
app.delete('/api/personajes/:id', (req, res) => {
    const personajeId = parseInt(req.params.id);
    const index = personajes.findIndex(p => p.id === personajeId);
    if (index !== -1) {
        personajes.splice(index, 1);
        res.json({ mensaje: `Personaje ${personajeId} eliminado` });
    } else {
        res.status(404).json({ mensaje: 'Personaje no encontrado' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
