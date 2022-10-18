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
        videoId: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        account: {
            type: DataTypes.STRING,
            allowNull: false
        },
        hashtag: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        views: {
            type: DataTypes.STRING,
            allowNull: false
        },
        heart: {
            type: DataTypes.STRING,
            allowNull: false
        },
        comments: {
            type: DataTypes.STRING,
            allowNull: false
        },
        share: {
            type: DataTypes.STRING,
            allowNull: false
        },
        videoUrl: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        webVideoUrl: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        expiresIn: {
            type: DataTypes.DATE,
            allowNull: false
        },
        createTime: {
            type: DataTypes.DATE,
            allowNull: false
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
        priority: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
        linkUrl: {
            type: DataTypes.STRING,
            allowNull: true
        },
        visibility: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        },
    }

    const modelOpts = {
        timestamps: true,
        createdAt: 'createTimestamp',
        updatedAt: 'updateTimestamp'
    }

    const TikTokInfo = sequelize.define('tiktokInfos', modelAttrs, modelOpts)

    return TikTokInfo

}