const express = require("express");
const router = express.Router();
const { Users, PersonasDependientes, UserPersonaDependiente } = require("../models");
const bcrypt = require("bcryptjs");
const {Router} = require("express");
const {sign} = require("jsonwebtoken")
const {validateToken} = require("../middlewares/AuthMiddleware")

//Listar usuarios
router.get("/list", async (req, res) => {
    const listOfUsers = await Users.findAll();
    res.json(listOfUsers);
});


//Listar auxiliares
router.get("/auxiliares/list", validateToken, async (req, res) => {
    const listOfAuxiliares = await Users.findAll({
        where: {
            rol: 'AUXILIAR'
        }
    })
    res.json(listOfAuxiliares);
})


//Mostrar auxiliar
router.get("/auxiliares/show/:id", validateToken, async (req, res) => {
    const id = req.params.id;
    const auxiliar = await Users.findByPk(id);
    if(auxiliar) {
        return res.json(auxiliar);
    } else {
        return res.json({error: "There is no user with this id"})
    }

})


//Editar auxiliar
router.put("/auxiliares/edit/:id", validateToken, async (req, res) => {
    const {nombre, apellidos, telefono, username, password} = req.body;
    const id = req.params.id;

    const auxiliar = await Users.findByPk(id)

    if(auxiliar) {
        try {
            await Users.update({
                    nombre: nombre,
                    apellidos: apellidos,
                    telefono: telefono,
                    username: username,
                },
                {where: {id: id}}
            );
            return res.json("SUCCESS");
        } catch (e) {
            return res.json(e)
        }
    } else {
        return res.json({error: "There is no auxiliar with this id"})
    }


})


//Eliminar auxiliar
router.delete("/auxiliares/delete/:id", validateToken, async (req, res) => {
    const id = req.params.id;

    const auxiliar = await Users.findByPk(id)

    if(auxiliar) {
        await UserPersonaDependiente.destroy({
            where: {userId: id}
        })

        await Users.destroy({
            where: {
                id: id
            }
        })
        return res.json("DELETED SUCCESSFULLY");
    } else {
        return res.json({error: "There is no auxiliar with this id"})
    }


})


//Método para listar los auxiliares disponibles para asignar a una persona dependiente concreta
router.get("/personaDependiente/:id/listAuxiliaresDisponibles", validateToken, async (req, res) => {
    const id = req.params.id;
    let listaAuxiliaresDisponibles = [];

    //Devuelve todos los auxiliares
    const listOfAuxiliares = await Users.findAll({
        where: {
            rol: 'AUXILIAR'
        }
    })

    for (const auxiliar of listOfAuxiliares) {
        // Devuelve todos las personas dependientes asociadas de cada auxiliar
        const listOfUserPersonaDependiente = await UserPersonaDependiente.findAll({
            where: {
                userId: auxiliar.id,
            }
        })

        let condicion = true;

        //Si ese auxiliar no tiene ninguna persona dependiente asociada, se añade a la lista de auxiliares disponibles
        if(listOfUserPersonaDependiente.length == 0) {
            console.log("este auxiliar no tiene ninguna persona dependiente asociada")
            listaAuxiliaresDisponibles.push(auxiliar)
        } else {
            //Si no, se comprueba que dicho auxiliar no tenga ya a esa persona dependiente asociada
            for (const userPersonaDependiente of listOfUserPersonaDependiente) {
                if(userPersonaDependiente.personaDependienteId == id) {
                    condicion = false;
                    console.log("falso")
                    break;
                }
            }
            // Y en caso afirmativo, se añade a la lista de auxiliares disponibles.
            if(condicion) {
                console.log("true")
                listaAuxiliaresDisponibles.push(auxiliar)
            }
        }


    }
    res.json(listaAuxiliaresDisponibles)
})



//Método para listar todos los familiares del sistema
router.get("/familiares/list", validateToken, async(req, res) => {
    const listOfFamiliares = await Users.findAll({
        where: {
            rol: 'FAMILIAR'
        }
    })
    res.json(listOfFamiliares);
})


/*
//Método para listar todos los familiares disponibles para asignar a una persona dependiente concreta
router.get("/personaDependiente/:id/listFamiliaresDisponibles", async (req, res) => {
    const id = req.params.id;
    let listaFamiliaresDisponibles = [];

    //Devuelve todos los familiares
    const listOfFamiliares = await Users.findAll({
        where: {
            rol: 'FAMILIAR'
        }
    })

    for (const familiar of listOfFamiliares) {
        // Devuelve todos las personas dependientes asociadas de cada familiar
        const listOfUserPersonaDependiente = await UserPersonaDependiente.findAll({
            where: {
                userId: familiar.id,
            }
        })

        let condicion = true;

        //Si ese familiar no tiene ninguna persona dependiente asociada, se añade a la lista de familiares disponibles
        if(listOfUserPersonaDependiente.length == 0) {
            console.log("este familiar no tiene ninguna persona dependiente asociada")
            listaFamiliaresDisponibles.push(familiar)
        } else {
            //Si no, se comprueba que dicho familiar no tenga ya a esa persona dependiente asociada
            for (const userPersonaDependiente of listOfUserPersonaDependiente) {
                if(userPersonaDependiente.personaDependienteId == id) {
                    condicion = false;
                    console.log("falso")
                    break;
                }
            }
            // Y en caso afirmativo, se añade a la lista de familiares disponibles.
            if(condicion) {
                console.log("true")
                listaFamiliaresDisponibles.push(familiar)
            }
        }
    }
    res.json(listaFamiliaresDisponibles)
})
*/

//Registrar un usuario
router.post("/create", validateToken, async (req, res) => {
    const { nombre, apellidos, telefono, rol, username, password } = req.body;
    if(password.length >= 8 && password.length <= 16) {
        const hash = await bcrypt.hash(password, 10)
        try {
            await Users.create({
                nombre: nombre,
                apellidos: apellidos,
                telefono: telefono,
                rol: rol,
                username: username,
                password: hash,
            });
        } catch (e) {
            if(e) {
                return res.json(e)
            }
        }
        return res.json("SUCCESS");

    } else {
        return res.json({error: "La contraseña debe tener entre 8 y 16 caracteres"});
    }

});



//Login
router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const user = await Users.findOne({ where: { username: username }});

    if(!user) {
        res.json({ error: "User doesn't exist" });
    } else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Wrong username and password combination" })
            } else {
                const accessToken = sign(
                    { username: user.username, id: user.id, rol: user.rol },
                    "importantsecret"
                );
                res.json({token: accessToken, username: user.username, id: user.id, rol: user.rol});
            }
        })
    }
})


router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
})




module.exports = router;
