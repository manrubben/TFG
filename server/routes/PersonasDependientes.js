const express = require("express");
const router = express.Router();
const { PersonasDependientes } = require("../models");
const { Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");


//Listar personas dependientes
router.get("/", validateToken, async (req, res) => {
    const listOfPersonasDependientes = await PersonasDependientes.findAll({

    })
    res.json(listOfPersonasDependientes);
})


//Mostrar los detalles de una persona dependiente
router.get("/show/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    const personaDependiente = await PersonasDependientes.findByPk(id);
    res.json(personaDependiente);
})


//Registrar una persona dependiente
router.post("/create", validateToken, async (req, res) => {
    const {nombre, apellidos, enfermedad, gradoDeDependencia, pastillasDia, pastillasTarde, pastillasNoche} = req.body;
    await PersonasDependientes.create({
        nombre: nombre,
        apellidos: apellidos,
        enfermedad: enfermedad,
        gradoDeDependencia: gradoDeDependencia,
        pastillasDia: pastillasDia,
        pastillasTarde: pastillasTarde,
        pastillasNoche: pastillasNoche,
    });
    res.json("SUCCESS");
});


//Editar los datos de una persona dependiente
router.put("/edit/:id", validateToken, async (req, res) => {
    const {nombre, apellidos, enfermedad, gradoDeDependencia, pastillasDia, pastillasTarde, pastillasNoche} = req.body;
    const id = req.params.id;
    await PersonasDependientes.update(
        {
            nombre: nombre,
            apellidos: apellidos,
            enfermedad: enfermedad,
            gradoDeDependencia: gradoDeDependencia,
            pastillasDia: pastillasDia,
            pastillasTarde: pastillasTarde,
            pastillasNoche: pastillasNoche
        },
        {where: {id: id}}
    )
    res.json("SUCCESS");
})


module.exports = router;
