module.exports = (sequelize, DataTypes) => {
    const Observaciones = sequelize.define("Observaciones", {
        titulo: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'El título no debe estar vacío'
                }
            }
        },

        descripcion: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'La descripción no debe estar vacío'
                }
            }
        },

        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return Observaciones;
};


