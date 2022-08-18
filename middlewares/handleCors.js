const handleCors = (req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	// handle OPTIONS method
	if ('OPTIONS' == req.method) {
		return res.status(200);
	} else {
		next();
	}
};

module.exports = handleCors;
