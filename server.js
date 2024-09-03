const express = require('express');
const jsYaml = require('js-yaml');
const app = express();
const port = 8080;

// Middleware para parsear el body de las peticiones como JSON o YAML
app.use(express.json());
app.use(express.text({ type: 'application/yaml' }));

// Función personalizada para enviar respuestas en YAML
function sendYamlResponse(res, data) {
  res.set('Content-Type', 'application/yaml');
  res.send(jsYaml.dump(data));
}

// Datos iniciales de personajes
let personajes = [
  { id: 1, nombre: 'Naruto Uzumaki', anime: 'Naruto', habilidad: 'Rasengan' },
  // ... otros personajes
];

// Rutas

// GET - Obtener todos los personajes
app.get('/api/personajes', (req, res) => {
  sendYamlResponse(res, personajes);
});

// GET - Obtener un personaje por ID
app.get('/api/personajes/:id', (req, res) => {
  // ... lógica para buscar el personaje
  sendYamlResponse(res, personaje);
});

// POST - Crear un nuevo personaje
app.post('/api/personajes', (req, res) => {
  let nuevoPersonaje;
  try {
    nuevoPersonaje = jsYaml.load(req.body);
  } catch (error) {
    return res.status(400).json({ error: 'Error al parsear el YAML' });
  }

  // ... lógica para agregar el nuevo personaje
  sendYamlResponse(res, { mensaje: 'Personaje creado', personaje: nuevoPersonaje });
});

// PUT - Actualizar un personaje existente
app.put('/api/personajes/:id', (req, res) => {
  // ... lógica para actualizar el personaje
  sendYamlResponse(res, { mensaje: 'Personaje actualizado', personaje: personajeActualizado });
});

// DELETE - Eliminar un personaje
app.delete('/api/personajes/:id', (req, res) => {
  // ... lógica para eliminar el personaje
  sendYamlResponse(res, { mensaje: 'Personaje eliminado' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});