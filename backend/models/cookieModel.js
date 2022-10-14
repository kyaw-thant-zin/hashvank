module.exports = (sequelize, DataTypes) => {

    const modelAttrs = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        msToken: {
            type: DataTypes.TEXT,
            allowNull: false
        }
    }

    const modelOpts = {
        timestamps: true,
        createdAt: 'createTimestamp',
        updatedAt: 'updateTimestamp'
    }

    const CookieModel = sequelize.define('cookies', modelAttrs, modelOpts)

    return CookieModel

}