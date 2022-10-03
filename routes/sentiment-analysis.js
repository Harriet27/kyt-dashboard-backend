const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/text2data', async (req, res, next) => {
  const body = {
    DocumentText: req.body.text,
    IsTwitterContent: false,
    PrivateKey: process.env.TEXT2DATA_PRIVATE_KEY,
    Secret: process.env.TEXT2DATA_SECRET,
    RequestIdentifier: "",
  };
  function capitaliseFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  try {
    const response = await axios.post(
      `http://api.text2data.com/v3/analyze`,
      body,
    );
    return res.status(200).json({
      tag: capitaliseFirstLetter(response.data["DocSentimentResultString"]),
      percentage: (response.data["DocSentimentValue"] * 100).toFixed(2),
      response: response.data,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
