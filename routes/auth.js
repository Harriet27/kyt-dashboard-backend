const router = require('express').Router();
const Controllers = require('../controllers/authController');
const { AuthenticateResetToken } = require('../middlewares/authentication');

router.post('/login', Controllers.login);
router.post('/register', Controllers.register);
router.get('/info/:access_token', Controllers.info);
router.post('/match-email', Controllers.matchEmail);
router.post(
	'/reset-password/:reset_password_token',
	AuthenticateResetToken,
	Controllers.resetPassword
);
router.post('/check-existing-email', Controllers.checkExistedEmail);

module.exports = router;
