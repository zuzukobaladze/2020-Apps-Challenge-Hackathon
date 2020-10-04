const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.DB_DB_HEROKU,process.env.DB_USERNAME_HEROKU, process.env.DB_PASSWORD_HEROKU,{
    host: process.env.DB_HOST_HEROKU,
    dialect: 'postgres',
    operatorsAliases: false,
    logging: false,
    ssl: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});