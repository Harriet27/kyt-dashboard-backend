const express = require('express');
const axios = require('axios');
const router = express.Router();
const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: 'fmrXfNe5WMa5Ld4AM8otc1PGp', // API KEY
  consumer_secret: '1jYwuj2FMJvqoHcPnobyU1djZTFmmZGhoiBBzYG6T8T3UPib9g', // API KEY SECRET
  access_token_key: '2196879859-SiuQJfTTbRZ6wvcg3NmlYz30xspYNf7ONYL2lEg', // ACCESS TOKEN
  access_token_secret: 'rsM52mRekTpwKVfvEdd4E2STEKA0vehuXpIh6mTzpGJKa', // ACCESS TOKEN SECRET
});

router.get('/1', async (req, res, next) => {
  var tweetId = '1581695296043483139';
  await client.get(`statuses/retweet/${tweetId}`, function (error, tweet, response) {
    res.status(200).send(tweet);
  });
});

module.exports = router;
