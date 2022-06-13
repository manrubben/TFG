module.exports = (sequelize, DataTypes) => {
    const AuxiliaresRegistros = sequelize.define("AuxiliaresRegistros", {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        registroId: {
            type: DataTypes.INTEGER,
        },
        auxiliarId: {
            type: DataTypes.INTEGER,
        },
    });
    AuxiliaresRegistros.associate = models => {
        AuxiliaresRegistros.belongsTo(models.RegistrosDiarios, {
            foreignKey: 'registroId'
        });

    }
    return AuxiliaresRegistros;

};
