module.exports = (sequelize, DataTypes) => {
    const PersonasDependientes = sequelize.define("PersonasDependientes", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        enfermedad: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        gradoDeDependencia: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pastillas: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return PersonasDependientes;
};
