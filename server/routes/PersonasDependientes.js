const express = require("express");
const router = express.Router();
const { PersonasDependientes, UserPersonaDependiente } = require("../models");
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

    if(personaDependiente) {
        return res.json(personaDependiente)
    } else {
        return res.json({error: "There is no personaDependiente with this id"})
    }
})


//Registrar una persona dependiente
router.post("/create", validateToken, async (req, res) => {
    const {nombre, apellidos, enfermedad, gradoDeDependencia, pastillasDia, pastillasTarde, pastillasNoche} = req.body;
    try {
        await PersonasDependientes.create({
            nombre: nombre,
            apellidos: apellidos,
            enfermedad: enfermedad,
            gradoDeDependencia: gradoDeDependencia,
            pastillasDia: pastillasDia,
            pastillasTarde: pastillasTarde,
            pastillasNoche: pastillasNoche,
        });

    } catch (e) {
        if(e) {
            return res.json(e)
        }
    }
    return res.json("SUCCESS");

});


//Editar los datos de una persona dependiente
router.put("/edit/:id", validateToken, async (req, res) => {
    const {nombre, apellidos, enfermedad, gradoDeDependencia, pastillasDia, pastillasTarde, pastillasNoche} = req.body;
    const id = req.params.id;

    const personaDependiente = await PersonasDependientes.findByPk(id);

    if(personaDependiente) {
        try {
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
        } catch (e) {
            if(e) {
                return res.json(e)
            }
        }
        return res.json("SUCCESS");
    } else {
        return res.json({error: "There is no personaDependiente with this id"})
    }


})


//Eliminar una persona dependiente
router.delete("/delete/:id", validateToken, async (req, res) => {
    const id = req.params.id;

    const personaDependiente = await PersonasDependientes.findByPk(id)

    if(personaDependiente) {
        await UserPersonaDependiente.destroy({
            where: {personaDependienteId: id}
        })

        await PersonasDependientes.destroy({
            where: {
                id: id
            }
        })
        return res.json("DELETED SUCCESSFULLY");
    } else {
        return res.json({error: "There is no personaDependiente with this id"})
    }


})


//Listar personas dependientes asociadas
router.get("/personasAsignadas/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    let lista2 = [];
    const listOfPersonasDependientes = await UserPersonaDependiente.findAll({
        where: {
                    userId: id,
                },
    })
     for(const personaDependiente of listOfPersonasDependientes) {
            const personaDependiente2 = await PersonasDependientes.findByPk(personaDependiente.personaDependienteId);
            lista2.push(personaDependiente2)
     }
    res.json(lista2);
})


module.exports = router;
