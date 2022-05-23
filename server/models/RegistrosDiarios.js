module.exports = (sequelize, DataTypes) => {
    const RegistrosDiarios = sequelize.define("RegistrosDiarios", {

        fecha: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        desayuno: {
            type: DataTypes.TEXT,

        },
        almuerzo: {
            type: DataTypes.TEXT,

        },
        merienda: {
            type: DataTypes.TEXT,

        },

        cena: {
            type: DataTypes.TEXT,

        },

        pasosDiarios: {
            type: DataTypes.INTEGER,

        },

        actividadFisica: {
            type: DataTypes.STRING,

        },

        horasSueno: {
            type: DataTypes.DOUBLE,
        },

        tiempoAireLibre: {
            type: DataTypes.STRING,

        },

        relacionSocial: {
            type: DataTypes.STRING,
        },

        medicacion: {
            type: DataTypes.BOOLEAN,
            allowNull: false,

        },

        PersonasDependienteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    });

    return RegistrosDiarios;
};