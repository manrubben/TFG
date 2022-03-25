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

    PersonasDependientes.associate = models => {
        PersonasDependientes.belongsToMany(models.Users, {
            through: 'UserPersonaDependiente', foreignKey: 'userId'
        })
    }

    return PersonasDependientes;
};
