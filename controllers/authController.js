const { Op } = require('sequelize');
const { User } = require('../sequelize');
const { Hash, CompareHash } = require('../helpers/hash');
const { SignToken, VerifyToken } = require('../helpers/jwt');
const jwt = require('jsonwebtoken');
const path = require('path');

class Controller {
	static async login(req, res, next) {
		try {
			const input = {
				email: req.body.email,
				password: req.body.password,
			};
			const user = await User.findOne({
				where: {
					email: input.email,
				},
			});
			if (!user) {
				res.status(401).json({
					message: 'Wrong email or Password',
				});
			} else if (!CompareHash(input.password, user.password)) {
				res.status(401).json({
					message: 'Wrong Password',
				});
			} else {
				const decoded = SignToken({
					id: user.id,
					username: user.username,
					email: user.email,
					password: user.password,
					role: user.role,
					verified: user.verified,
				});
				res.status(200).json({
					access_token: decoded,
					verified: user.verified === 1 ? true : false,
				});
			}
		} catch (err) {
			// console.log(err,'errornya')
			next(err);
		}
	}
}

module.exports = Controller;
