const router = require('express').Router();
const Controllers = require('../controllers/authController');
const { AuthenticateResetToken } = require('../middlewares/authentication');

router.post('/login', Controllers.login);

module.exports = router;
