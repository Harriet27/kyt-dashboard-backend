const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/post-detail', async (req, res, next) => {
  const options = {
    method: 'GET',
    url: `https://instagram188.p.rapidapi.com/postinfo/${req.query.post_url}`,
    headers: {
      'X-RapidAPI-Key': 'c65465c802mshb1cd31dfb3b2e51p1f08e0jsnc0ce310b3ca1',
      'X-RapidAPI-Host': 'instagram188.p.rapidapi.com',
    },
  };
  await axios.request(options)
    .then(function (response) {
      res.status(200).json(response.data);
    }).catch(function (error) {
      res.status(500).json(error);
    });
});

router.post('/post-comments', async (req, res, next) => {
  const options = {
    method: 'GET',
    url: `https://instagram188.p.rapidapi.com/postcomment/${req.query.post_url}/%7Bend_cursor%7D`,
    headers: {
      'X-RapidAPI-Key': 'c65465c802mshb1cd31dfb3b2e51p1f08e0jsnc0ce310b3ca1',
      'X-RapidAPI-Host': 'instagram188.p.rapidapi.com',
    },
  };
  await axios.request(options)
    .then(function (response) {
      res.status(200).json(response.data);
    }).catch(function (error) {
      res.status(500).json(error);
    });
});

module.exports = router;
