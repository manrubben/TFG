module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
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
        telefono: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'El número de teléfono no puede estar vacío'
                }
            }
        },
        rol: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'El nombre de usuario no puede estar vacío'
                }
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: {
                    args: true,
                    msg: 'La contraseña no puede estar vacía'
                }
            }
        },
    });

    return Users;
};
