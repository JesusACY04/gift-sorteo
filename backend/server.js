// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config(); // Cargar variables de entorno

const app = express();

// Middleware para permitir CORS y manejar JSON
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

console.log("MONGODB_URI:", process.env.MONGODB_URI); // Línea de prueba para verificar si se carga correctamente

// Conexión a MongoDB usando la URI de conexión en el archivo .env
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Conectado a MongoDB");
        app.listen(PORT, () => {
            console.log(`Servidor en funcionamiento en el puerto ${PORT}`);
        });
    })
    .catch(error => {
        console.error("Error de conexión:", error);
        process.exit(1); // Termina el proceso si falla la conexión
    });

// Importar y usar el enrutador de participantes
app.use("/api/participantes", require("./routes/participantes"));
