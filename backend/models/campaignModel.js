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
        campaignName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        account: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hashtag: {
            type: DataTypes.STRING,
            allowNull: false
        },
        collectionTypeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'collectionTypes',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        linkTypeId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'linkTypes',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        visibility: {
            type: DataTypes.BOOLEAN,
            allowNull: false
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

    const Campaign = sequelize.define('campaigns', modelAttrs, modelOpts)

    return Campaign

}