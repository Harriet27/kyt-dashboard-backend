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

/*
  mas
  {
    "query":"from:mas lang:en",
    "maxResults": "100",
    "fromDate":"201403080000",
    "toDate":"201404050000"
  }
  ------------------
  flyethiopian
  {
    "query":"from:flyethiopian lang:en",
    "maxResults": "100",
    "fromDate":"201903100000",
    "toDate":"201904070000"
  }
  ------------------
  airasia
  {
    "query":"from:airasia lang:en",
    "maxResults": "100",
    "fromDate":"201412290000",
    "toDate":"201501250000"
  }
*/

router.get('/full-archive-search/mas', async (req, res, next) => {
  const body = {
    "query":"from:mas lang:en",
    "maxResults": "100",
    "fromDate":"201403080000",
    "toDate":"201404050000"
  };
  const options = {
    headers: {
      "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
  };
  try {
    const response = await axios.post(
      `https://api.twitter.com/1.1/tweets/search/fullarchive/dev.json`,
      body,
      options
    );
    const data = response.data;
    const tweets = data.results.map(i => {
      return {
        tweet_id: i.id_str,
        tweet: i.text,
        name: i.user.name,
        username: i.user.screen_name,
      };
    });
    return res.status(200).send({
      total: data.results.length,
      // result: tweets,
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.get('/full-archive-search/flyethiopian', async (req, res, next) => {
  const body = {
    "query":"from:flyethiopian lang:en",
    "maxResults": "100",
    "fromDate":"201903100000",
    "toDate":"201904070000"
  };
  const options = {
    headers: {
      "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
  };
  try {
    const response = await axios.post(
      `https://api.twitter.com/1.1/tweets/search/fullarchive/dev.json`,
      body,
      options
    );
    const data = response.data;
    const tweets = data.results.map(i => {
      return {
        tweet_id: i.id_str,
        tweet: i.text,
        name: i.user.name,
        username: i.user.screen_name,
      };
    });
    return res.status(200).send({
      total: data.results.length,
      // result: tweets,
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.get('/full-archive-search/airasia', async (req, res, next) => {
  const body = {
    "query":"from:airasia lang:en",
    "maxResults": "100",
    "fromDate":"201412290000",
    "toDate":"201501250000"
  };
  const options = {
    headers: {
      "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
    },
  };
  try {
    const response = await axios.post(
      `https://api.twitter.com/1.1/tweets/search/fullarchive/dev.json`,
      body,
      options
    );
    const data = response.data;
    const tweets = data.results.map(i => {
      return {
        tweet_id: i.id_str,
        tweet: i.text,
        name: i.user.name,
        username: i.user.screen_name,
      };
    });
    return res.status(200).send({
      total: data.results.length,
      // result: tweets,
      data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = router;
