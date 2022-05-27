
const express = require("express");
const router = express.Router();
const { RegistrosDiarios, AuxiliaresRegistros } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.post("/addRegistro", validateToken, async (req, res) => {
    const {desayuno, almuerzo, merienda, cena, pasosDiarios, actividadFisica,
        horasSueno, tiempoAireLibre, relacionSocial, PersonasDependienteId} = req.body;

    const hoy = new Date(Date.now());

    const mes = hoy.getMonth()+1;
    const hoyString = hoy.toLocaleDateString()

    const registroDiario = await RegistrosDiarios.findAll({
        where: {
            PersonasDependienteId: PersonasDependienteId,
            fecha: hoyString
        }
    })

    if(Object.entries(registroDiario).length === 0){

        try {

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
                relacionSocial: relacionSocial,
                medicacionManana: false,
                medicacionTarde: false,
                medicacionNoche: false,
                mes: mes,
                PersonasDependienteId: PersonasDependienteId,

            });
        } catch (e) {
            if(e) {
                return res.json(e)
            }
        }

       return res.json("SUCCESS");

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

    // ver si ya existe la relacion entre auxiliar y registro
    const auxiliarRegistro = await AuxiliaresRegistros.findAll({
        where: {
            registroId: registroId,
            auxiliarid: auxiliarId
        }
    })

    if(Object.entries(auxiliarRegistro).length === 0) {

        try {

            await AuxiliaresRegistros.create({
                registroId: registroId,
                auxiliarId: auxiliarId,

            });

        } catch (e) {
            if(e) {
                return res.json(e)
            }
        }


        res.json("SUCCESS");

    } else {
        return res.json({error: "El auxiliar ya está asociado al registro"})
    }


});

//VER SI AUXILIAR ESTÁ ASOCIADO AL REGISTRO
router.get('/auxiliarRegistro/:id', validateToken, async (req, res) => {

    const personaDependienteId = req.params.id;
    const fecha = req.query.fecha;
    const auxiliarId = req.user.id;

    const registroDiario = await RegistrosDiarios.findAll({
        where: {
            PersonasDependienteId: personaDependienteId,
            fecha: fecha
        }

    })

    const registro = registroDiario[0];

    const registroId = registro.id

    const registroAuxiliar = await AuxiliaresRegistros.findAll({
        where: {
            registroId: registroId,
            auxiliarId: auxiliarId
        }


    })

    const registroAUX = registroAuxiliar[0];

    res.json(registroAUX);

})



router.put('/registro/edit/:id', validateToken, async (req, res) => {

    const {fecha,desayuno, almuerzo, merienda, cena, pasosDiarios, actividadFisica,
        horasSueno, tiempoAireLibre, relacionSocial, PersonasDependienteId} = req.body;
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
                    relacionSocial: relacionSocial,
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
//VER REGISTRO POR ID
router.get('/showRegistroEdit/:id', validateToken, async (req, res) => {

    const registroId = req.params.id;

    const registroDiario = await RegistrosDiarios.findAll({
        where: {
            id: registroId
        }

    })

    const registro = registroDiario[0];

    res.json(registro);

})

//VER REGISTRO DE UN DIA
router.get('/showRegistro/:id', validateToken, async (req, res) => {

    const personaDependienteId = req.params.id;
    const fecha = req.query.fecha;

    const registroDiario = await RegistrosDiarios.findAll({
        where: {
            PersonasDependienteId: personaDependienteId,
            fecha: fecha
        }

    })

    const registro = registroDiario[0];

    res.json(registro);

})

//OBTENER REGISTROS DE UN MES
router.get('/showRegistrosMes/:id', validateToken, async (req, res) => {

    const personaDependienteId = req.params.id;
    const mes = req.query.mes;

    const registrosMes = await RegistrosDiarios.findAll({
        where: {
            PersonasDependienteId: personaDependienteId,
            mes: mes
        }

    })

    res.json(registrosMes);

})


module.exports = router;