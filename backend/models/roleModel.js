module.exports = (sequelize, DataTypes) => {

    const modelAttrs = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }

    const modelOpts = {
        timestamps: true,
        createdAt: 'createTimestamp',
        updatedAt: 'updateTimestamp'
    }

    const Role = sequelize.define('roles', modelAttrs, modelOpts)

    return Role

}