if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}
// require('dotenv').config();

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes/index');
const errorHandler = require('./middlewares/errorHandler');
const handleCors = require('./middlewares/handleCors');
const serverless = require('serverless-http');

app.use(morgan('dev'));
app.use(cors());
app.use(handleCors);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res, next) => {
	res.send('Welcome to KYT Dashboard API');
});

app.use(router);
app.use(errorHandler);

app.listen(port, () => {
	console.log(`Listening on port: ${port}`);
});

module.exports.handler = serverless(app);
