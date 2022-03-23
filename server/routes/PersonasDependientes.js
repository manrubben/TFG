const express = require("express");
const router = express.Router();
const { PersonasDependientes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//Registrar una persona dependiente
router.post("/create", validateToken, async (req, res) => {
    const {nombre, apellidos, enfermedad, gradoDeDependencia, pastillasDia, pastillasTarde, pastillasNoche} = req.body;
    await PersonasDependientes.create({
        nombre: nombre,
        apellidos: apellidos,
        enfermedad: enfermedad,
        gradoDeDependencia: gradoDeDependencia,
        pastillasDia: pastillasDia,
        pastillasTarde: pastillasTarde,
        pastillasNoche: pastillasNoche,
    });
    res.json("SUCCESS");
});


module.exports = router;