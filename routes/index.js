const router = require('express').Router();

const auth = require('./auth');
const posts = require('./posts');
const cloudinary = require('./cloudinary');
const comments = require('./comments');
const monkeylearn = require('./monkeylearn');
const sentimentAnalysis = require('./sentiment-analysis');
const instagram = require('./instagram');

router.use('/auth', auth);
router.use('/posts', posts);
router.use('/cloudinary', cloudinary);
router.use('/comments', comments);
router.use('/monkeylearn', monkeylearn);
router.use('/sentiment-analysis', sentimentAnalysis);
router.use('/instagram', instagram);

module.exports = router;
