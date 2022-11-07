const router = require('express').Router();

const auth = require('./auth');
const posts = require('./posts');
const cloudinary = require('./cloudinary');
const comments = require('./comments');
const monkeylearn = require('./monkeylearn');
const sentimentAnalysis = require('./sentiment-analysis');
const instagram = require('./instagram');
const twitter = require('./twitter');
const puppeteer = require('./puppeteer');

router.use('/auth', auth);
router.use('/posts', posts);
router.use('/cloudinary', cloudinary);
router.use('/comments', comments);
router.use('/monkeylearn', monkeylearn);
router.use('/sentiment-analysis', sentimentAnalysis);
router.use('/instagram', instagram);
router.use('/twitter', twitter);
router.use('/puppeteer', puppeteer);

module.exports = router;
