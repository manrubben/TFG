module.exports = (sequelize, DataTypes) => {
    const Avisos = sequelize.define("Avisos", {

        aviso: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'El aviso no debe estar vacío'
                }
            }
        },

        PersonasDependienteId: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    });

    return Avisos;
};


