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
        hashtag: {
            type: DataTypes.STRING,
            allowNull: true
        },
        imageUrl: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        title: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        pageUrl: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        tiktokInfoId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'tiktokInfos',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'users',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        }
    }

    const modelOpts = {
        timestamps: true,
        createdAt: 'createTimestamp',
        updatedAt: 'updateTimestamp'
    }

    const LinkSetting = sequelize.define('linkSettings', modelAttrs, modelOpts)

    return LinkSetting

}