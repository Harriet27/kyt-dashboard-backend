const { Op } = require('sequelize');
const { Auth } = require('../sequelize');
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
			const auth = await Auth.findOne({
				where: {
					email: input.email,
				},
			});
			if (!auth) {
				res.status(401).json({
					message: 'Wrong email or Password',
				});
				// } else if (!CompareHash(input.password, auth.password)) {
			} else if (input.password !== auth.password) {
				res.status(401).json({
					message: 'Wrong Password',
				});
			} else {
				const decoded = SignToken({
					id: auth.id,
					username: auth.username,
					email: auth.email,
					password: auth.password,
					role: auth.role,
					verified: auth.verified,
				});
				res.status(200).json({
					access_token: decoded,
					verified: auth.verified === 1 ? true : false,
				});
			}
		} catch (err) {
			// console.log(err,'errornya')
			next(err);
		}
	}
}

module.exports = Controller;
