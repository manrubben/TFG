module.exports = (sequelize, DataTypes) => {
    const RegistrosDiarios = sequelize.define("RegistrosDiarios", {

        fecha: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        desayuno: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        almuerzo: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        merienda: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        cena: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        pasosDiarios: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        actividadFisica: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        horasSueno: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },

        tiempoAireLibre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        PersonasDependienteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    });

    return RegistrosDiarios;
};