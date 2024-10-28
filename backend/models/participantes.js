// models/Participante.js
const mongoose = require("mongoose");

const participanteSchema = new mongoose.Schema({
    telefono: { type: String, required: true },
    nombre: { type: String, required: true },
    correo: { type: String, required: true },
    numeroControl: { type: String, required: true }
});

module.exports = mongoose.model("Participante", participanteSchema);
