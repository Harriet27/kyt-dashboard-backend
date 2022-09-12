const router = require('express').Router();
const Controllers = require('../controllers/commentsController');

router.get('/', Controllers.get);

module.exports = router;
