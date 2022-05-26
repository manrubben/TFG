const express = require("express");
const router = express.Router();
const { NotificacionMedicacion, RegistrosDiarios} = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


router.get('/createNotificacionMedicacion/:id', validateToken, async (req, res) => {
    //const {PersonasDependienteId} = req.body;
    const hoy = new Date(Date.now());
    const fecha = hoy.toLocaleDateString();
    const PersonasDependienteId = req.params.id;

    console.log(PersonasDependienteId);

    try {

        const notificaciones = await NotificacionMedicacion.findAll({
            where: {
                PersonasDependienteId: PersonasDependienteId,
            }
        })


        if(notificaciones.length === 0) {

            await NotificacionMedicacion.create({
                    fecha: fecha,
                    dia: false,
                    tarde: false,
                    noche: false,
                    PersonasDependienteId: PersonasDependienteId,
                }
            );

        } else if(notificaciones[0].fecha !== fecha) {
            await NotificacionMedicacion.update({
                fecha: fecha,
                dia: false,
                tarde: false,
                noche: false,
            },
                {where: {PersonasDependienteId: PersonasDependienteId}}
            );
        }


    } catch (e) {
        if(e) {
            return res.json(e)
        }
    }

    res.json("SUCCESS");
});

router.get('/updateDia/:id', validateToken, async (req, res) => {
    //const {PersonasDependienteId} = req.body;
    const PersonasDependienteId = req.params.id;
    const hoy = new Date(Date.now());
    const hoyString = hoy.toLocaleDateString()
    const mes = hoy.getMonth()+1;

    try {

        await NotificacionMedicacion.update({
                dia: true,
            },
            {where: {PersonasDependienteId: PersonasDependienteId}}
        );

        const registroDiario = await RegistrosDiarios.findOne({
            where: {
                PersonasDependienteId: PersonasDependienteId,
                fecha: hoyString
            }

        })

        if(registroDiario === null){
            await RegistrosDiarios.create({
                fecha: hoyString,
                medicacionManana: true,
                medicacionTarde: false,
                medicacionNoche: false,
                mes: mes,
                PersonasDependienteId: PersonasDependienteId
            })
        } else {
            await RegistrosDiarios.update({
                    medicacionManana: true
                },
                {where: {PersonasDependienteId: PersonasDependienteId,
                        fecha: hoyString}
                })
        }

    } catch (e) {
        if(e) {
            return res.json(e)
        }
    }

    res.json("SUCCESS");

});

router.get('/updateTarde/:id', validateToken, async (req, res) => {
    //const {PersonasDependienteId} = req.body;
    const PersonasDependienteId = req.params.id;
    const hoy = new Date(Date.now());
    const hoyString = hoy.toLocaleDateString()
    const mes = hoy.getMonth()+1;

    await NotificacionMedicacion.update({
            tarde: true,
        },
        {where: {PersonasDependienteId: PersonasDependienteId}}
    );

    const registroDiario = await RegistrosDiarios.findOne({
        where: {
            PersonasDependienteId: PersonasDependienteId,
            fecha: hoyString
        }

    })

    if(registroDiario === null){
        await RegistrosDiarios.create({
            fecha: hoyString,
            medicacionManana: false,
            medicacionTarde: true,
            medicacionNoche: false,
            mes: mes,
            PersonasDependienteId: PersonasDependienteId
        })
    } else {
        await RegistrosDiarios.update({
                medicacionTarde: true
            },
            {where: {PersonasDependienteId: PersonasDependienteId,
                    fecha: hoyString}
            })
    }

    res.json("SUCCESS");

});
router.get('/updateNoche/:id', validateToken, async (req, res) => {
    //const {PersonasDependienteId} = req.body;
    const PersonasDependienteId = req.params.id;
    const hoy = new Date(Date.now());
    const hoyString = hoy.toLocaleDateString()
    const mes = hoy.getMonth()+1;

    await NotificacionMedicacion.update({
            noche: true,
        },
        {where: {PersonasDependienteId: PersonasDependienteId}}
    );

    const registroDiario = await RegistrosDiarios.findOne({
        where: {
            PersonasDependienteId: PersonasDependienteId,
            fecha: hoyString
        }

    })

    if(registroDiario === null){
        await RegistrosDiarios.create({
            fecha: hoyString,
            medicacionManana: false,
            medicacionTarde: false,
            medicacionNoche: true,
            mes: mes,
            PersonasDependienteId: PersonasDependienteId
        })
    } else {
        await RegistrosDiarios.update({
                medicacionNoche: true
            },
            {where: {PersonasDependienteId: PersonasDependienteId,
                    fecha: hoyString}
            })
    }

    res.json("SUCCESS");

});

router.get('/notificacionMedicacion/:id', validateToken, async (req, res) => {
    const PersonasDependienteId = req.params.id;

    const notificaciones = await NotificacionMedicacion.findAll({
        where: {
            PersonasDependienteId: PersonasDependienteId,
        }
    })

    const notificacionMed = notificaciones[0]

    res.json(notificacionMed);

});


module.exports = router;