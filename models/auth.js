module.exports = (sequelize, type) => {
	return sequelize.define(
		'auth',
		{
			id: {
				type: type.INTEGER,
				primaryKey: true,
				autoIncrement: true,
			},
			username: {
				type: type.STRING,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: {
						msg: "Username can't be empty!",
					},
					len: {
						args: [5, 100],
						msg: 'Username field needs to be 5 to 100 characters!',
					},
				},
				unique: {
					args: true,
					msg: 'Username already in use!',
				},
			},
			email: {
				type: type.STRING,
				allowNull: false,
				validate: {
					isEmail: {
						msg: 'Invalid email format!',
					},
					notNull: true,
					notEmpty: {
						msg: 'email cannot be empty!',
					},
				},
				unique: {
					args: true,
					msg: 'Email address already in use!',
				},
			},
			password: {
				type: type.STRING,
				is: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: true,
					len: {
						args: 7,
						msg: 'Password must be atleast 7 characters in length',
					},
				},
			},
			role: {
				type: type.BOOLEAN,
				allowNull: false,
				validate: {
					notNull: true,
					notEmpty: {
						msg: 'role cannot be empty!',
					},
				},
			},
			verified: type.INTEGER,
		},
		{
			timestamps: false,
			freezeTableName: true,
			indexes: [{ unique: true, fields: ['email', 'username'] }],
		}
	);
};

// DUMP CONSTRAINT UNIQUE

// ALTER TABLE users ADD CONSTRAINT users_email_unique UNIQUE (email);
// ALTER TABLE users ADD CONSTRAINT users_username_unique UNIQUE (username);
