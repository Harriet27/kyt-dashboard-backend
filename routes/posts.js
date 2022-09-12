const router = require('express').Router();
const Controllers = require('../controllers/postsController');

router.get('/', Controllers.get);
router.post('/with-comment', Controllers.getWithComment);
router.get('/:post_id', Controllers.getByID);
router.post('/create', Controllers.create);
router.put('/update/:post_id', Controllers.update);
router.delete('/delete', Controllers.deleteById);

module.exports = router;
