const { Op } = require('sequelize');
const { Auth } = require('../sequelize');
const { Hash, CompareHash } = require('../helpers/hash');
const { SignToken, VerifyToken } = require('../helpers/jwt');
const jwt = require('jsonwebtoken');
const path = require('path');

class Controller {
	static async register(req, res, next) {
		try {
			const obj = {
				username: req.body.username,
				email: req.body.email,
				password: Hash(req.body.password),
				role: false,
				verified: false,
			};
			const user = await Auth.create(obj);
			return res.status(201).json({
				message: 'suscces register an acount',
			});
		} catch (err) {
			// console.log(user)
			// console.log(err)
			next(err);
		}
	}
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
			} else if (!CompareHash(input.password, auth.password)) {
				res.status(401).json({
					message: 'Wrong Password',
				});
			} else {
				const decoded = SignToken({
					user_id: auth.user_id,
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
	static info(req, res, next) {
		const access_token = req.params.access_token;
		const decoded = VerifyToken(access_token, process.env.SECRET);
		res.status(200).json({
			status: 200,
			message: 'Success',
			data: decoded,
		});
	}
	static matchEmail(req, res, next) {
		const email = req.body.email;
		Auth.findOne({
			where: {
				email: email,
			},
		})
			.then((result) => {
				const token = jwt.sign({ data: result }, process.env.SECRET);
				res.status(200).send({
					status: 200,
					message: 'Email matched',
					data_token: token,
				});
			})
			.catch((err) => {
				res.status(500).send({
					status: 500,
					message: err,
				});
			});
	}
	static resetPassword(req, res, next) {
		const newPassword = Hash(req.body.newPassword);
		const data = {
			password: newPassword,
		};
		const reset_password_token = req.params.reset_password_token;
		const decoded = VerifyToken(reset_password_token, process.env.SECRET);
		const reset = Auth.update(data, {
			where: {
				email: decoded.data.email,
			},
		});
		if (reset) {
			res.status(200).send({
				status: 200,
				message: 'Password successfully changed',
				new_password: `your new password is: ${newPassword}`,
			});
		} else {
			res.status(500).send({
				status: 500,
				message: 'Error, something wrong happened',
			});
		}
	}
	static async checkExistedEmail(req, res, next) {
		const check_email = req.body.check_email;
		const check = await Auth.findAll({
			where: {
				email: check_email,
			},
		});
		if (check.length === 0) {
			res.send({
				key: 'ok',
				message: 'Email available to use',
			});
		} else {
			res.send({
				key: 'not ok',
				message: 'Email address already in use!',
			});
		}
	}
}

module.exports = Controller;
