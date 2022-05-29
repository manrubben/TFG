module.exports = (sequelize, DataTypes) => {
    const NotificacionAviso = sequelize.define("NotificacionAviso", {
        nueva: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },

        PersonasDependienteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

        /*
        UserId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

         */

    });

    return NotificacionAviso;
};
