const express = require('express');
const app = express();
const port = 8080;

// Middleware para parsear el body de las peticiones como JSON
app.use(express.json());

//Configuracion para formatear la salida
app.set('json spaces', 2);

// Datos iniciales de personajes
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
    const { nombre, anime, habilidad } = req.body;
    if (!nombre || !anime || !habilidad) {
        return res.status(400).json({ mensaje: 'Faltan campos requeridos' });
    } else {
        const nuevoPersonaje = { id: personajes.length ? personajes[personajes.length - 1].id + 1 : 1, nombre, anime, habilidad };
        personajes.push(nuevoPersonaje);

        res.status(201).json({
            mensaje: 'Personaje Creado',
            id: nuevoPersonaje.id,
            nombre: nuevoPersonaje.nombre,
            anime: nuevoPersonaje.anime,
            habilidad: nuevoPersonaje.habilidad
        });
    }
});

// PUT - Actualizar un personaje existente y eliminar datos no enviados
app.put('/api/personajes/:id', (req, res) => {
    const personajeId = parseInt(req.params.id);
    const index = personajes.findIndex(p => p.id === personajeId);
    if (index !== -1) {
        const nuevoPersonaje = { id: personajeId, ...req.body };
        personajes[index] = nuevoPersonaje;
        res.status(201).json({
            mensaje: 'Personaje actualizado',
            id: nuevoPersonaje.id,
            nombre: nuevoPersonaje.nombre,
            anime: nuevoPersonaje.anime,
            habilidad: nuevoPersonaje.habilidad
        });
    } else {
        res.status(404).json({ mensaje: 'Personaje no encontrado' });
    }
});

// PATCH - ACTUALIZAR PARCIALMENTE UN PERSONAJE EXISTENTE
app.patch('/api/personajes/:id', (req, res) => {
    const personajeId = parseInt(req.params.id);
    const index = personajes.findIndex(p => p.id === personajeId);
    if (index !== -1) {
        personajes[index] = {...personajes[index],...req.body}

        res.status(200).json({ mensaje: 'Personaje actualizado parcialmente', personajeId ,personaje: personajes[index] });
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
        res.status(204).json({ mensaje: `Personaje ${personajeId} eliminado`});
    } else {
        res.status(404).json({ mensaje: 'Personaje no encontrado' });
    }
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
