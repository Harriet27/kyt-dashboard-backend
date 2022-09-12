const router = require('express').Router();
const Controllers = require('../controllers/commentsController');

router.get('/', Controllers.getAll);
router.get('/:comment_id', Controllers.getByID);

module.exports = router;
