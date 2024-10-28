// models/Participante.js
const mongoose = require("mongoose");

const participanteSchema = new mongoose.Schema({
    telefono: { type: String, required: true, match: /^[0-9]{10}$/ },
    nombre: { type: String, required: true },
    correo: { type: String, required: true, match: /^L\d{8}@cancun\.tecnm\.mx$/ },
    numeroControl: { type: String, required: true, match: /^\d{8}$/ }
});

module.exports = mongoose.model("Participante", participanteSchema);
