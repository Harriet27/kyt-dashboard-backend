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

router.post('/full-archive-search', async (req, res, next) => {
  const body = {
    "query":`from:${req.body.user} lang:en`,
    "maxResults": `${req.body.maxResults}`,
    "fromDate":`${req.body.fromYear}${req.body.fromMonth}${req.body.fromDate}0000`,
    "toDate":`${req.body.toYear}${req.body.toMonth}${req.body.toDate}0000`,
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
        url: `https://twitter.com/i/web/status/${i.id_str}`,
        tweet_id: i.id_str,
        tweet: i.text,
        name: i.user.name,
        username: i.user.screen_name,
        fromDate: `${req.body.fromYear}-${req.body.fromMonth}-${req.body.fromDate}T00:00:00-07:00`,
        toDate: `${req.body.toYear}-${req.body.toMonth}-${req.body.toDate}T00:00:00-07:00`,
      };
    });
    return res.status(200).send({
      total: data.results.length,
      result: tweets,
      // data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.get('/full-archive-search/mas', async (req, res, next) => {
  const body = {
    "query":"from:mas lang:en",
    "maxResults": "100",
    "fromDate":"201403080000",
    "toDate":"201404050000",
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
      result: tweets,
      // data,
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
    "toDate":"201904070000",
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
      result: tweets,
      // data,
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
    "toDate":"201501250000",
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
      result: tweets,
      // data,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.get('/search-all/conversation_id', async (req, res, next) => {
  const id = req.query.id;
  const start_time = req.query.start_time;
  const end_time = req.query.end_time;
  const options = {
    headers: {
      "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN_PROJECT}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.twitter.com/2/tweets/search/all?query=conversation_id:${id}&tweet.fields=in_reply_to_user_id,author_id,created_at,conversation_id&max_results=500${start_time !== undefined ? `&start_time=${start_time}T00:00:00-07:00` : ''}${end_time !== undefined ? `&end_time=${end_time}T00:00:00-07:00` : ''}`,
      options
    );
    const data = response.data;
    return res.status(200).send(data);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

router.get('/search-all/in_reply_to_status_id', async (req, res, next) => {
  const id = req.query.id;
  const start_time = req.query.start_time;
  const end_time = req.query.end_time;
  const options = {
    headers: {
      "Authorization": `Bearer ${process.env.TWITTER_BEARER_TOKEN_PROJECT}`,
    },
  };
  try {
    const response = await axios.get(
      `https://api.twitter.com/2/tweets/search/all?query=in_reply_to_status_id:${id}&tweet.fields=in_reply_to_user_id,author_id,created_at,conversation_id&max_results=500${start_time !== undefined ? `&start_time=${start_time}T00:00:00-07:00` : ''}${end_time !== undefined ? `&end_time=${end_time}T00:00:00-07:00` : ''}`,
      options
    );
    const data = response.data.data;
    const author_id = data.map((item, index) => {
      return item.author_id;
    });
    const author_id_str = author_id.join(",");
    const res_author = await axios.get(
      `https://api.twitter.com/2/users?ids=${author_id_str}`,
      options
    );
    const author_result = res_author.data.data;
    const author_arrobj = author_result.map((item, idx) => {
      return ({
        author_name: item.username,
      });
    });
    const final_result = data.map((item, idx) => {
      return ({
        ...item,
        ...author_arrobj[idx],
      });
    });
    return res.status(200).send(final_result);
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
});

module.exports = router;
