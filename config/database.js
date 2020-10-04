const Sequelize = require('sequelize');

module.exports = new Sequelize('dg16l2ldv7jmh','qtxptrpklvsrqk','abf08d6ea458cf009d54cf9bb8dcbaa439967efd9d3de65f9a7b2c33e888c575',{
    host: 'ec2-54-217-236-206.eu-west-1.compute.amazonaws.com',
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