module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        nombre: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        apellidos: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    });

    Users.associate = (models) => {
        Users.belongsToMany(models.PersonasDependientes, {
            through: "user_personasDependientes",
            as: "personasDependientes",
            foreignKey: "userId",
        });
    };

    return Users;
};
