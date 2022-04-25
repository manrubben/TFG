const express = require("express");
const router = express.Router();
const { RegistrosDiarios, AuxiliaresRegistros } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.post("/addRegistro", validateToken, async (req, res) => {
    const {desayuno, almuerzo, merienda, cena, pasosDiarios, actividadFisica,
        horasSueno, tiempoAireLibre, PersonasDependienteId} = req.body;

    const hoy = new Date(Date.now());
    const hoyString = hoy.toLocaleDateString()
    const registroDiario = await RegistrosDiarios.findAll({
        where: {
            PersonasDependienteId: PersonasDependienteId,
            fecha: hoyString
        }
    })

    console.log(registroDiario)

    //const registro = registroDiario[0];
    //console.log(registro);

    if(Object.entries(registroDiario).length === 0){

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
    } else {
        return res.json({error: "Ya hay un registro con esta fecha"})
    }

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


router.put('/registro/edit/:id', validateToken, async (req, res) => {

    const {fecha,desayuno, almuerzo, merienda, cena, pasosDiarios, actividadFisica,
        horasSueno, tiempoAireLibre, PersonasDependienteId} = req.body;
    const id = req.params.id;
    const registro = await RegistrosDiarios.findByPk(id);

    if(registro) {
        try {
            await RegistrosDiarios.update({
                    fecha: fecha,
                    desayuno: desayuno,
                    almuerzo: almuerzo,
                    merienda: merienda,
                    cena: cena,
                    pasosDiarios: pasosDiarios,
                    actividadFisica: actividadFisica,
                    horasSueno: horasSueno,
                    tiempoAireLibre: tiempoAireLibre,
                    PersonasDependienteId: PersonasDependienteId,
                },
                {where: {id: id}}
            );
            return res.json("SUCCESS");
        } catch (e) {
            return res.json(e)
        }
    } else {
        return res.json({error: "There is no registro with this id"})
    }

})


//VER REGISTRO DE UN DIA
router.get('/showRegistro/:id', validateToken, async (req, res) => {

    const personaDependienteId = req.params.id;
    const fecha = req.query.fecha;
    //const fechaString = fecha.toLocaleDateString()

    const registroDiario = await RegistrosDiarios.findAll({
        where: {
            PersonasDependienteId: personaDependienteId,
            fecha: fecha
        }

    })

    const registro = registroDiario[0];

    res.json(registro);

})


module.exports = router;