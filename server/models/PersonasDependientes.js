module.exports = (sequelize, DataTypes) => {
    const PersonasDependientes = sequelize.define("PersonasDependientes", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    PersonasDependientes.associate = (models) => {
        PersonasDependientes.belongsToMany(models.Users, {
            through: "user_personasDependientes",
            as: "users",
            foreignKey: "personaDependienteId",
        });
    };

    return PersonasDependientes;
};
