// models/Participante.js
const mongoose = require("mongoose");

const participanteSchema = new mongoose.Schema({
    telefono: String,
    nombre: String,
    correo: String,
    numeroControl: String
});

module.exports = mongoose.model("participantes", participanteSchema);
