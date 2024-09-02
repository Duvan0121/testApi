const express = require('express');
const jsYaml = require('js-yaml');

const app = express();
const port = 8080;

// Datos de ejemplo en formato JavaScript
const datos = {
  nombre: 'Juan',
  edad: 30,
  ciudad: 'Madrid',
  hobbies: ['leer', 'programar', 'viajar']
};

// Ruta para obtener los datos en formato YAML
app.get('/datos', (req, res) => {
  // Convertir los datos a YAML utilizando dump (seguro por defecto)
  const yamlData = jsYaml.dump(datos);

  // Configurar la respuesta con el tipo de contenido YAML
  res.setHeader('Content-Type', 'application/x-yaml');
  res.send(yamlData);
});

app.listen(port, () => {
  console.log(`Servidor escuchando en el puerto ${port}`);
}); 