const { Sequelize } = require('sequelize');

module.exports = new Sequelize('codegig', 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres'
});
