const bcrypt = require('bcryptjs');

function Hash(payload) {
	return bcrypt.hashSync(payload, 10);
}

function CompareHash(input, password) {
	return bcrypt.compareSync(input, password);
}

module.exports = {
	Hash,
	CompareHash,
};
