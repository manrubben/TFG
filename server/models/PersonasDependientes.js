module.exports = (sequelize, DataTypes) => {
    const PersonasDependientes = sequelize.define("PersonasDependientes", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'El nombre no puede estar vacío'
                }
            }
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'Los apellidos no pueden estar vacíos'
                }
            }
        },
        enfermedad: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'La enfermedad no puede estar vacía'
                }
            }
        },
        gradoDeDependencia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pastillasDia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pastillasTarde: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pastillasNoche: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    PersonasDependientes.associate = (models) => {
        PersonasDependientes.hasMany(models.RegistrosDiarios, {
            onDelete: "cascade",
        })

    }


    return PersonasDependientes;
};
