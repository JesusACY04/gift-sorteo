// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Cargar variables de entorno

console.log("MONGODB_URI:", process.env.MONGODB_URI); // Línea de prueba para verificar si se carga correctamente

const app = express();

// Middleware para permitir CORS y manejar JSON
app.use(cors());
app.use(express.json());

// Conexión a MongoDB usando la URI de conexión en el archivo .env
mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("Conectado a MongoDB"))
    .catch(error => console.error("Error de conexión:", error));

// Importar y usar el enrutador de participantes
app.use("/api/participantes", require("./routes/participantes"));

// Definir el puerto del servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
});
