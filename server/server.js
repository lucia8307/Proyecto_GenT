const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db'); // Importa la función para conectar a la DB
const mongoose = require('mongoose');


const app = express();
app.use(cors());
app.use(bodyParser.json());

// Cargar variables de entorno
require('dotenv').config();

// Conectar a MongoDB
connectDB(); // Usar la función centralizada para conectar a la base de datos

// Rutas
app.use('/auth', require('./routes/auth'));
app.use('/upload', require('./routes/upload'));
app.use('/search', require('./routes/search'));
app.use('/profile', require('./routes/profile'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));


mongoose.connection.on('error', (err) => {
  console.error('Error en la conexión a la base de datos:', err);
});

mongoose.connection.once('open', () => {
  console.log('Conexión exitosa a la base de datos');
});

console.log("Conexión a MongoDB:", process.env.DB_URL);

