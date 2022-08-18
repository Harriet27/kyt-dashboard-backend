module.exports = {
	development: {
		DB_NAME: process.env.DB_NAME,
		DB_USER: process.env.DB_USER,
		DB_PWD: process.env.DB_PWD,
		DB_HOST: process.env.DB_HOST,
		DB_PORT: process.env.DB_PORT,
		host: process.env.DB_HOST,
		dialect: 'postgres',
		port: process.env.DB_PORT,
		logging: false,
		pool: {
			max: 10,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
	},
	production: {
		DB_NAME: process.env.DB_NAME,
		DB_USER: process.env.DB_USER,
		DB_PWD: process.env.DB_PWD,
		DB_HOST: process.env.DB_HOST,
		DB_PORT: process.env.DB_PORT,
		host: process.env.DB_HOST,
		dialect: 'postgres',
		port: process.env.DB_PORT,
		logging: false,
		pool: {
			max: 10,
			min: 0,
			acquire: 30000,
			idle: 10000,
		},
		dialectOptions: {
			ssl: {
				require: true,
				rejectUnauthorized: false,
			},
		},
	},
};
