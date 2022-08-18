const jwt = require('jsonwebtoken');

function SignToken(payload) {
	const token = jwt.sign(payload, process.env.SECRET);
	return token;
}

function VerifyToken(token) {
	const decoded = jwt.verify(token, process.env.SECRET);
	return decoded;
}

module.exports = {
	SignToken,
	VerifyToken,
};
