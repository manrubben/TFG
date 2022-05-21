const express = require("express");
const router = express.Router();
const { Observaciones, NotificacionObservacion } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


//crear una observacion
router.post("/createObservacion", validateToken, async (req, res) => {
    const {titulo, descripcion, username, UserId, PersonasDependienteId} = req.body;
    //const username = req.user.username;
    //const userId = req.user.id;


    try {

        // Busca si esta creada la notificacion para esa persona
        const notificaciones = await NotificacionObservacion.findAll({
            where: {
                PersonasDependienteId: PersonasDependienteId,
            }
        })

        await Observaciones.create({
            titulo: titulo,
            descripcion: descripcion,
            username: username,
            PersonasDependienteId: PersonasDependienteId,
            UserId: UserId,


        });

        if(notificaciones.length === 0) {

            console.log("=================" + PersonasDependienteId);
            await NotificacionObservacion.create({
                nueva: true,
                PersonasDependienteId: PersonasDependienteId,
            });
        } else {
            await NotificacionObservacion.update({
                    nueva: true,

                },
                {where: {PersonasDependienteId: PersonasDependienteId}}
            );
        }


    } catch (e) {
        if(e) {
            return res.json(e)
        }
    }

    return res.json("SUCCESS");

});


//VER SI HAY NOTIFICACION
router.get('/notificacion/:id', validateToken, async (req, res) => {

    const personaDependienteId = req.params.id;

    const notificaciones = await NotificacionObservacion.findAll({
        where: {
            PersonasDependienteId: personaDependienteId,
        }

    })

    const notificacion = notificaciones[0]

    res.json(notificacion);

});


//VER REGISTRO DE UN DIA
router.get('/showObservaciones/:id', validateToken, async (req, res) => {

    const personaDependienteId = req.params.id;
    const rol = req.user.rol;

    const observaciones = await Observaciones.findAll({
        where: {
            PersonasDependienteId: personaDependienteId,
        }

    })

    try {

        if(rol === "FAMILIAR"){
            await NotificacionObservacion.update({
                    nueva: false,
                },
                {where: {PersonasDependienteId: personaDependienteId}}
            );
        }

    } catch (e) {
        if(e) {
            return res.json(e)
        }
    }




    res.json(observaciones);

});
//Borrar un comentario
router.delete("/deleteObservacion/:observacionId", validateToken, async (req, res) => {
    const observacionId = req.params.observacionId;

    const observacion = await Observaciones.findByPk(observacionId)

    if(observacion){
        await Observaciones.destroy({
            where: {
                id: observacionId,
            },
        });

        res.json("DELETED SUCCESSFULLY");
    } else {
        return res.json({error: "There is no observacion with this id"})
    }


});


module.exports = router;