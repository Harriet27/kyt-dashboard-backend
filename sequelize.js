const Sequelize = require('sequelize');

const AuthModel = require('./models/auth');

const env = process.env.NODE_ENV || 'development';
// const env = process.env.NODE_ENV || 'production';
const config = require(__dirname + '/config/config.js')[env];

const sequelize = new Sequelize(config.DB_NAME, config.DB_USER, config.DB_PWD, config);

const Auth = AuthModel(sequelize, Sequelize);

module.exports = {
	Auth,
};
