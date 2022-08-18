const { VerifyToken } = require('../helpers/jwt');
const { User } = require('../sequelize');

async function Authenticate(req, res, next) {
	try {
		const { access_token } = req.headers;
		if (!access_token) {
			res.status(401).json({
				message: 'Do not Have Access',
			});
		} else {
			const decoded = VerifyToken(access_token);
			const user = await User.findOne({
				where: {
					email: decoded.email,
				},
			});
			if (!user) {
				res.status(404).json({ msg: 'Id Not Found' });
			} else {
				req.decoded = decoded;
				next();
			}
		}
	} catch (error) {
		next(error);
	}
}

async function AuthenticateSeller(req, res, next) {
	try {
		const { access_token } = req.headers;
		// console.log(req.headers)
		if (!access_token) {
			res.status(401).json({
				message: 'Do not Have Access',
			});
		} else {
			const decoded = VerifyToken(access_token);
			const user = await User.findOne({
				where: {
					email: decoded.email,
					role: 'seller',
				},
			});
			if (!user) {
				res.status(404).json({ msg: 'Id Not Found' });
			} else {
				req.decoded = decoded;
				next();
			}
		}
	} catch (error) {
		next(error);
	}
}

async function AuthenticateResetToken(req, res, next) {
	try {
		const { reset_password_token } = req.params;
		// console.log(req.params)
		if (!reset_password_token) {
			res.status(401).json({
				message: 'Do not Have Access',
			});
		} else {
			const decoded = VerifyToken(reset_password_token);
			const user = await User.findOne({
				where: {
					email: decoded.data.email,
				},
			});
			if (!user) {
				res.status(404).json({ msg: 'Id Not Found' });
			} else {
				req.decoded = decoded;
				next();
			}
		}
	} catch (error) {
		next(error);
	}
}

module.exports = {
	Authenticate,
	AuthenticateSeller,
	AuthenticateResetToken,
};
