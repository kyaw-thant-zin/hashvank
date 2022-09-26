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
        showAccount: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        showTitle: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        showHashtag: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        apiSettingId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'apiSettings',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
    }

    const modelOpts = {
        timestamps: true,
        createdAt: 'createTimestamp',
        updatedAt: 'updateTimestamp'
    }

    const LayoutContent = sequelize.define('layoutContents', modelAttrs, modelOpts)

    return LayoutContent

}