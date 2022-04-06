const express = require("express");
const router = express.Router();
const { Users, PersonasDependientes, UserPersonaDependiente } = require("../models");
const {sign} = require("jsonwebtoken")
const {validateToken} = require("../middlewares/AuthMiddleware")


// Metodo para añadir un auxiliar/familiar a una persona dependiente y viceversa
router.post('/addTo', async (req, res) => {

    const {userId, personaDependienteId} = req.body;

    try {
        const [userPersonaDependiente, created] = await UserPersonaDependiente.findOrCreate({
            where: {
                userId: userId,
                personaDependienteId: personaDependienteId
            }
        })

        if(created) {
            res.json("SUCCESS")
        } else {
            res.json("UserPersonaDependiente already exists")
        }

    } catch (e) {
        if(e) {
            return res.json(e)
        }
    }




});


//Método para eliminar un auxiliar/familiar de una persona dependiente y viceversa
router.delete("/delete", async (req, res) => {

    const id = req.body.userId;
    const personaDependienteId = req.body.personaDependienteId;
    await UserPersonaDependiente.destroy({
        where:{
            userId: id,
            personaDependienteId: personaDependienteId,
        }
    })
    res.json("SUCCESS");
})

//Método para listar los auxiliares asignados a una persona dependiente concreta
router.get('/list/:id', validateToken, async (req, res) => {
    const id = req.params.id;
    let lista2 = [];
    const listaAuxiliaresPersonaDependiente = await UserPersonaDependiente.findAll({
        where: {
            personaDependienteId: id,
        },

    })
    for(const user of listaAuxiliaresPersonaDependiente) {
        const user2 = await Users.findByPk(user.userId);

        if(user2.rol === "AUXILIAR") {
            console.log("true")
            lista2.push(user2)
        } else {
            console.log("false")
        }


    }

    res.json(lista2)

})


// Metodo para mostrar todas las asociaciones de los auxiliares/familiares
router.get("/addTo", async (req, res) => {
    try {
        const userPersonaDependiente = await UserPersonaDependiente.findAll({
            attributes: ['id'],
            include: [{
                model: Users,
                attributes: ['nombre', 'apellidos'],
            }, {
                model: PersonasDependientes,
                attributes: ['nombre'],
            }],
        });
        res.send(userPersonaDependiente);
    } catch (err) {
        res.send(err);
    }
});

module.exports = router;
