const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/classify', async (req, res, next) => {
  const body = {
    data: req.body.data,
  };
  const options = {
    headers: {
      "Authorization": `Token ${process.env.MONKEYLEARN_API_KEY}`,
    },
  };
  try {
    const response = await axios.post(
      `https://api.monkeylearn.com/v3/classifiers/${process.env.MONKEYLEARN_MODEL_ID_SA}/classify/`,
      body,
      options
    );
    return res.status(200).json({
      data: response.data,
    });
  } catch (err) {
    return res.status(500).send(err);
  }
});

module.exports = router;
