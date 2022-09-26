const dbConfig = require('../config/database')

const { Sequelize, DataTypes } = require('sequelize')

const sequelize = new Sequelize(
    dbConfig.NAME,
    dbConfig.USER,
    dbConfig.PASS,
    {
        host: dbConfig.HOST,
        dialect: dbConfig.dialect,
        charset: 'utf8mb4',
        collate: 'utf8mb4_unicode_ci',
        dialectOptions: {
            useUTC: false,
            timezone: process.env.DB_TIMEZONE,
        },
        timezone: process.env.DB_TIMEZONE,
        operatorsAliases: 'false',
        pool: {
            max: dbConfig.pool.max,
            min: dbConfig.pool.min,
            acquire: dbConfig.pool.acquire,
            idle: dbConfig.pool.idle
        }
    }
)

sequelize.authenticate()
.then(() => console.log('connected.....') )
.catch((err) => console.log(err) )

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./userModel')(sequelize, DataTypes)
db.roles = require('./roleModel')(sequelize, DataTypes)
db.collectionTypes = require('./collectionTypeModel')(sequelize, DataTypes)
db.linkTypes = require('./linkTypeModel')(sequelize, DataTypes)
db.campaigns = require('./campaignModel')(sequelize, DataTypes)
db.tiktokInfos = require('./tiktokInfoModel')(sequelize, DataTypes)
db.linkSettings = require('./linkSettingModel')(sequelize, DataTypes)
db.apiSettings = require('./apiSettingModel')(sequelize, DataTypes)
db.layoutContents = require('./layoutContentModel')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => console.log('re-sync done!') )


// Eager Loading

db.roles.hasOne(db.users, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}) // roles => user
db.users.belongsTo(db.roles) // user => roles

db.users.hasMany(db.campaigns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}) // users => campaign
db.campaigns.belongsTo(db.users) // campaign => users

db.collectionTypes.hasMany(db.campaigns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}) // collectionType => campaign
db.campaigns.belongsTo(db.collectionTypes) // campaign => collectionType

db.linkTypes.hasMany(db.campaigns, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}) // linkType => campaign
db.campaigns.belongsTo(db.linkTypes) // campaign => linkType

db.campaigns.hasMany(db.tiktokInfos, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}) // campaigns => tiktokInfos
db.tiktokInfos.belongsTo(db.campaigns) // tiktokinfos => campaigns

db.tiktokInfos.hasMany(db.linkSettings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}) // tiktokInfos => linkSettings
db.linkSettings.belongsTo(db.tiktokInfos) // linkSettings => tiktokinfos

db.users.hasMany(db.linkSettings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}) // users => linkSettings
db.linkSettings.belongsTo(db.users) // linkSettings => users

db.campaigns.hasOne(db.apiSettings, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}) // campaigns => apiSettings
db.apiSettings.belongsTo(db.campaigns) // apiSettings => campaigns

db.apiSettings.hasOne(db.layoutContents,  {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
}) // apiSettings => layoutContents
db.layoutContents.belongsTo(db.apiSettings) // layoutContents => apiSettings

module.exports = db