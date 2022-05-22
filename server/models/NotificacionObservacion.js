module.exports = (sequelize, DataTypes) => {
    const NotificacionObservacion = sequelize.define("NotificacionObservacion", {
        nueva: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        PersonasDependienteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

    });

    return NotificacionObservacion;
};
