const express = require("express");
const router = express.Router();
const { RegistrosDiarios, AuxiliaresRegistros } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.post("/addRegistro", validateToken, async (req, res) => {
    const {desayuno, almuerzo, merienda, cena, pasosDiarios, actividadFisica,
        horasSueno, tiempoAireLibre, PersonasDependienteId} = req.body;




    await RegistrosDiarios.create({
        desayuno: desayuno,
        almuerzo: almuerzo,
        merienda: merienda,
        cena: cena,
        pasosDiarios: pasosDiarios,
        actividadFisica: actividadFisica,
        horasSueno: horasSueno,
        tiempoAireLibre: tiempoAireLibre,
        PersonasDependienteId: PersonasDependienteId,

    });

    const {registroId, auxiliarId} = req.body;
    await AuxiliaresRegistros.create({
        registroId: registroId,
        auxiliarId: auxiliarId,
    });
    res.json("SUCCESS");
});

module.exports = router;