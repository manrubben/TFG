module.exports = (sequelize, DataTypes) => {
    const NotificacionMedicacion = sequelize.define("NotificacionMedicacion", {

        fecha: {
            type: DataTypes.STRING,
            allowNull: false,
        },

        dia: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        tarde: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        noche: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        PersonasDependienteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    });

    return NotificacionMedicacion;
};
