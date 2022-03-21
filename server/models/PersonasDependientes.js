module.exports = (sequelize, DataTypes) => {
    const PersonasDependientes = sequelize.define("PersonasDependientes", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    return PersonasDependientes;
};
