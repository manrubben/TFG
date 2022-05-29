const express = require("express");
const router = express.Router();
const { Avisos, NotificacionAviso } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


//crear un aviso
router.post("/createAviso", validateToken, async (req, res) => {
    const {aviso, PersonasDependienteId} = req.body;


    try {

        await Avisos.create({
            aviso: aviso,
            PersonasDependienteId: PersonasDependienteId,
        });

        // Busca si esta creada la notificacion de aviso para esa persona
        const notificaciones = await NotificacionAviso.findAll({
            where: {
                PersonasDependienteId: PersonasDependienteId,
            }
        })


        if(notificaciones.length === 0) {

            await NotificacionAviso.create({
                nueva: true,
                PersonasDependienteId: PersonasDependienteId,
            });
        } else {
            await NotificacionAviso.update({
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


//VER SI HAY NOTIFICACION AVISO
router.get('/notificacion/:id', validateToken, async (req, res) => {

    const personaDependienteId = req.params.id;

    const notificaciones = await NotificacionAviso.findAll({
        where: {
            PersonasDependienteId: personaDependienteId,
        }

    })

    const notificacionAviso = notificaciones[0]

    res.json(notificacionAviso);

});


//VER LOS AVISOS DE UNA PERSONA
router.get('/showAvisos/:id', validateToken, async (req, res) => {

    const personaDependienteId = req.params.id;
    const rol = req.user.rol;

    const avisos = await Avisos.findAll({
        where: {
            PersonasDependienteId: personaDependienteId,
        }

    })

    try {

        if(rol === "AUXILIAR"){
            await NotificacionAviso.update({
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




    res.json(avisos);

});
//Borrar un aviso
router.delete("/deleteAviso/:avisoId", validateToken, async (req, res) => {
    const avisoId = req.params.avisoId;

    try {

        const aviso = await Avisos.findByPk(avisoId)

        if(aviso){
            await Avisos.destroy({
                where: {
                    id: avisoId,
                },
            });

            res.json("DELETED SUCCESSFULLY");
        } else {
            return res.json({error: "There is no aviso with this id"})
        }

    } catch (e) {
        if(e) {
            return res.json(e)
        }
    }


});


module.exports = router;