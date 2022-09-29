const router = require('express').Router();
const Controllers = require('../controllers/commentsController');

router.get('/', Controllers.getAll);
router.get('/:comment_id', Controllers.getByID);
router.post('/post/:post_id', Controllers.getPostCommentNew);
router.post('/create', Controllers.create);
router.delete('/delete', Controllers.deleteById);

module.exports = router;
