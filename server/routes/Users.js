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


//Registrar un usuario
router.post("/create", async (req, res) => {
    const { nombre, apellidos, username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
        Users.create({
            nombre: nombre,
            apellidos: apellidos,
            username: username,
            password: hash,
        });
        res.json("SUCCESS");
    });
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
                    { username: user.username, id: user.id },
                    "importantsecret"
                );
                res.json({token: accessToken, username: user.username, id: user.id});
            }
        })
    }
})


router.get("/auth", validateToken, (req, res) => {
    res.json(req.user);
})




module.exports = router;
