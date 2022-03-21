const express = require("express");
const router = express.Router();
const { Users, PersonasDependientes, UserPersonaDependiente } = require("../models");
const {sign} = require("jsonwebtoken")
const {validateToken} = require("../middlewares/AuthMiddleware")


// Metodo para añadir un auxiliar/familiar a una persona dependiente y viceversa
router.post('/addTo', async (req, res) => {

    const {userId, personaDependienteId} = req.body;
    await UserPersonaDependiente.create({
        userId: userId,
        personaDependienteId: personaDependienteId,
    });
    res.json("SUCCESS")
});

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
