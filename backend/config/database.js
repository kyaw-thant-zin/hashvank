module.exports = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'root',
    PASS: process.env.DB_PASS || '',
    NAME: process.env.DB_NAME || 'hashvank',
    TIMEZONE: process.env.DB_TIMEZONE || 'ETC/GMT+06:30',
    dialect: process.env.DB_TYPE || 'mariadb',

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }

}