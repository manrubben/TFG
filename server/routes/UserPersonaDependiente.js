const express = require("express");
const router = express.Router();
const { Users, PersonasDependientes, UserPersonaDependiente } = require("../models");
const {sign} = require("jsonwebtoken")
const {validateToken} = require("../middlewares/AuthMiddleware")


// Metodo para añadir un auxiliar a una persona dependiente y viceversa
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

//Método para añadir un familiar a una persona dependiente
router.post("/personaDependiente/:id/addFamiliar", validateToken, async (req, res) => {
    const { nombre, apellidos, telefono, rol, username } = req.body;
    const id = req.params.id

    try {
        const user = await Users.findOne({
            where: {
                nombre: nombre,
                apellidos: apellidos,
                telefono: telefono,
                rol: rol,
                username: username,
            }
        })

        if(user) {
            await UserPersonaDependiente.create({
                userId: user.id,
                personaDependienteId: id
            })
        } else {
            return res.json({error: "There is no familiar with this data"})
        }

    } catch (e) {
        return res.json(e)
    }

    return res.json("SUCCESS")
})


//Método para eliminar un auxiliar/familiar de una persona dependiente y viceversa
router.delete("/delete", async (req, res) => {

    const id = req.body.userId;
    const personaDependienteId = req.body.personaDependienteId;
    const userPersonaDependiente = await UserPersonaDependiente.findOne({
        where:{
            userId: id,
            personaDependienteId: personaDependienteId,
        }
    })

    if(userPersonaDependiente) {
        await UserPersonaDependiente.destroy({
            where:{
                userId: id,
                personaDependienteId: personaDependienteId,
            }
        })
        return res.json("SUCCESS");
    } else {
        return res.json({error: 'There is no userPersonaDependiente with this id'})
    }


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

//Método para listar los familiares asignados a una persona dependiente concreta.
router.get("/familiares/list/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    let lista2 = [];
    const listaFamiliaresPersonaDependiente = await UserPersonaDependiente.findAll({
        where: {
            personaDependienteId: id,
        },

    })
    for(const user of listaFamiliaresPersonaDependiente) {
        const user2 = await Users.findByPk(user.userId);

        if(user2.rol === "FAMILIAR") {
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
