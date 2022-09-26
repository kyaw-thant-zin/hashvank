
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
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'email',
            validate: {
                isEmail: true
            }
        },
        tel: {
            type: DataTypes.STRING,
            allowNull: true
        },
        userName: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: 'userName'
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true
        },
        lastLogin: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: sequelize.fn('now')
        },
        roleId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'roles',
                key: 'id',
                deferrable: Deferrable.INITIALLY_IMMEDIATE
            }
        },
        rememberToken: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        refreshToken: {
            type: DataTypes.TEXT,
            allowNull: true
        }
    }

    const modelOpts = {
        timestamps: true,
        createdAt: 'createTimestamp',
        updatedAt: 'updateTimestamp'
    }

    const User = sequelize.define('users', modelAttrs, modelOpts)

    return User

}