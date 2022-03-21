const express = require("express");
const router = express.Router();
const { PersonasDependientes } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

//Registrar una persona dependiente
router.post("/create", async (req, res) => {
    const {nombre} = req.body;
    await PersonasDependientes.create({
        nombre: nombre,
    });
    res.json("SUCCESS");
});


module.exports = router;
