const Sequelize = require('sequelize');

module.exports = new Sequelize('d9mlvbeqo3ko5j','mizqzejcldzxug','707cfba9c460fdab798953d490535e3366dae2643783d7ce41e2d39400e797b3',{
    host: 'ec2-54-217-213-79.eu-west-1.compute.amazonaws.com',
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