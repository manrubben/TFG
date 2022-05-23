const express = require("express");
const router = express.Router();
const { NotificacionMedicacion } = require("../models");
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

    res.json("SUCCES");
});

router.get('/updateDia/:id', validateToken, async (req, res) => {
    //const {PersonasDependienteId} = req.body;
    const PersonasDependienteId = req.params.id;

    await NotificacionMedicacion.update({
            dia: true,
        },
        {where: {PersonasDependienteId: PersonasDependienteId}}
    );

    res.json("SUCCES");

});

router.get('/updateTarde/:id', validateToken, async (req, res) => {
    //const {PersonasDependienteId} = req.body;
    const PersonasDependienteId = req.params.id;

    await NotificacionMedicacion.update({
            tarde: true,
        },
        {where: {PersonasDependienteId: PersonasDependienteId}}
    );

    res.json("SUCCES");

});
router.get('/updateNoche/:id', validateToken, async (req, res) => {
    //const {PersonasDependienteId} = req.body;
    const PersonasDependienteId = req.params.id;

    await NotificacionMedicacion.update({
            noche: true,
        },
        {where: {PersonasDependienteId: PersonasDependienteId}}
    );

    res.json("SUCCES");

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