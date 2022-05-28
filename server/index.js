const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = require("./models");


// Routers
const userRouter = require("./routes/Users");
app.use("/users", userRouter);
const personaRouter = require("./routes/PersonasDependientes");
app.use("/personasDependientes", personaRouter);
userPersonaDependienteRouter = require("./routes/UserPersonaDependiente");
app.use("/userPersonaDependiente", userPersonaDependienteRouter);

const notificacionMedicacionRouter = require("./routes/NotificacionMedicacion");
app.use("/notificaciones", notificacionMedicacionRouter);

const registroRouter = require("./routes/RegistrosDiarios");
app.use("/registrosDiarios", registroRouter);

const observacionRouter = require("./routes/Observaciones");
app.use("/observaciones", observacionRouter);

const avisoRouter = require("./routes/Avisos");
app.use("/avisos", avisoRouter);


db.sequelize.sync().then(() => {
    app.listen(3001, () => {
        console.log("Server running on port 3001");
    });
});

module.exports = {app, db}


