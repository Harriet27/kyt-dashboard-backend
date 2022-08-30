const router = require('express').Router();
const Controllers = require('../controllers/postsController');

router.get('/', Controllers.get);

module.exports = router;
