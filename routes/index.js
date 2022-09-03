const router = require('express').Router();

const auth = require('./auth');
const posts = require('./posts');
const cloudinary = require('./cloudinary');

router.use('/auth', auth);
router.use('/posts', posts);
router.use('/cloudinary', cloudinary);

module.exports = router;
