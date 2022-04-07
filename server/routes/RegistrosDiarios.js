const express = require("express");
const router = express.Router();
const { RegistrosDiarios, AuxiliaresRegistros } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// Método para listar los registros diarios de una persona dependiente
router.get("/list", validateToken, async (req, res) => {
    const listOfRegistrosDiarios = await RegistrosDiarios.findAll()
    return res.json(listOfRegistrosDiarios)
})


//Método para mostrar los detalles de un registro diario
router.get("/show/:id", validateToken, async (req, res) => {
    const id = req.params.id
    const registroDiario = await RegistrosDiarios.findByPk(id)

    if(registroDiario) {
        return res.json(registroDiario)
    } else {
        return res.json({error: "There is no registroDiario with this id"})
    }
})

router.post("/addRegistro", validateToken, async (req, res) => {
    const {desayuno, almuerzo, merienda, cena, pasosDiarios, actividadFisica,
        horasSueno, tiempoAireLibre, PersonasDependienteId} = req.body;

    const hoy = new Date(Date.now());

    await RegistrosDiarios.create({
        fecha: hoy.toLocaleDateString(),
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

    res.json("SUCCESS");
});


router.post("/addAuxiliarRegistro/:id", validateToken, async (req, res) => {

    const personaDependienteId = req.params.id;
    const hoy = new Date(Date.now());
    const hoyString = hoy.toLocaleDateString()
    const registroDiario = await RegistrosDiarios.findAll({
        where: {
            PersonasDependienteId: personaDependienteId,
            fecha: hoyString
        }
    })
    const registroId = registroDiario[0].id;
    const {auxiliarId} = req.body;
    await AuxiliaresRegistros.create({
        registroId: registroId,
        auxiliarId: auxiliarId,
    });
    res.json("SUCCESS");
});


module.exports = router;
