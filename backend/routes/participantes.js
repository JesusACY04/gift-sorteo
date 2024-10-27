const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Participante = require("../models/participantes");

router.post(
    "/",
    [
        body("telefono").matches(/^[0-9]{10}$/).withMessage("Número de teléfono inválido"),
        body("nombre").notEmpty().withMessage("Nombre es requerido"),
        body("correo").matches(/^[a-zA-Z0-9._%+-]+@cancun\.tecnm\.mx$/).withMessage("Correo institucional inválido"),
        body("numeroControl").matches(/^L\d{8}$/).withMessage("Número de control inválido")
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const nuevoParticipante = new Participante(req.body);
            await nuevoParticipante.save();
            res.status(201).send("Registro exitoso");
        } catch (error) {
            res.status(400).send("Error al registrar participante");
        }
    }
);

module.exports = router;
