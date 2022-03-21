module.exports = (sequelize, DataTypes) => {
    const UserPersonaDependiente = sequelize.define("UserPersonaDependiente", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userId: {
            type: DataTypes.INTEGER,
        },
        personaDependienteId: {
            type: DataTypes.INTEGER,
        },
    });
    UserPersonaDependiente.associate = models => {
        UserPersonaDependiente.belongsTo(models.Users, {
            foreignKey: 'userId'
        });
        UserPersonaDependiente.belongsTo(models.PersonasDependientes, {
            foreignKey: 'personaDependienteId'
        });
    }
    return UserPersonaDependiente;
};
