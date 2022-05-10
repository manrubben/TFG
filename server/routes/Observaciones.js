const express = require("express");
const router = express.Router();
const { Observaciones } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


//crear una observacion
router.post("/createObservacion", validateToken, async (req, res) => {
    const {titulo, descripcion, username, UserId, PersonasDependienteId} = req.body;
    //const username = req.user.username;
    //const userId = req.user.id;
    try {
        await Observaciones.create({
            titulo: titulo,
            descripcion: descripcion,
            username: username,
            PersonasDependienteId: PersonasDependienteId,
            UserId: UserId,

        });

    } catch (e) {
        if(e) {
            return res.json(e)
        }
    }
    return res.json("SUCCESS");

});


//VER REGISTRO DE UN DIA
router.get('/showObservaciones/:id', validateToken, async (req, res) => {

    const personaDependienteId = req.params.id;

    const observaciones = await Observaciones.findAll({
        where: {
            PersonasDependienteId: personaDependienteId,
        }

    })

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