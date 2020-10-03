const Sequelize = require('sequelize');

module.exports = new Sequelize('database','username','password',{
    host: 'amazonaws.com',
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