const router = require('express').Router();

const auth = require('./auth');
const posts = require('./posts');
const cloudinary = require('./cloudinary');
const comments = require('./comments');

router.use('/auth', auth);
router.use('/posts', posts);
router.use('/cloudinary', cloudinary);
router.use('/comments', comments);

module.exports = router;
