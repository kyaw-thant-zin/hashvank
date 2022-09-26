const { Deferrable } = require('sequelize')

module.exports = (sequelize, DataTypes) => {

    const modelAttrs = {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: sequelize.literal('UUID()'),
            unique: 'uuid',
        },
        campaignId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'campaigns',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        accessToken: {
            type: DataTypes.STRING,
            allowNull: false
        },
        layoutType: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        
    }

    const modelOpts = {
        timestamps: true,
        createdAt: 'createTimestamp',
        updatedAt: 'updateTimestamp'
    }

    const ApiSetting = sequelize.define('apiSettings', modelAttrs, modelOpts)

    return ApiSetting

}