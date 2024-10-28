const express = require("express");
const { body, validationResult } = require("express-validator");
const router = express.Router();
const Participante = require("../models/participantes");

router.post(
    "/",
    [
        body("telefono").matches(/^[0-9]{10}$/).withMessage("Número de teléfono inválido"),
        body("nombre").notEmpty().withMessage("Nombre es requerido"),
        // Cambiamos la validación del correo para que acepte 'L' seguido de 8 dígitos y el dominio 'cancun.tecnm.mx'
        body("correo").matches(/^L\d{8}@cancun\.tecnm\.mx$/).withMessage("Correo institucional inválido"),
        // Modificamos el patrón para que 'numeroControl' solo acepte exactamente 8 dígitos
        body("numeroControl").matches(/^\d{8}$/).withMessage("Número de control inválido")
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
            console.error("Error al registrar participante:", error);
            res.status(500).json({ message: "Error al registrar participante", error });
        }

    }
);

module.exports = router;
