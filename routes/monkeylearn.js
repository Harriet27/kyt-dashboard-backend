const express = require('express');
const axios = require('axios');
const router = express.Router();

const ml_api_url = process.env.MONKEYLEARN_API_URL;
const ml_api_key = process.env.MONKEYLEARN_API_KEY;
const ml_model_id_sa = process.env.MONKEYLEARN_MODEL_ID_SA;

router.post('/classify', async (req, res, next) => {
    const body = {
        data: [ req.body.text ],
    };
    const options = {
        headers: {
            "Authorization": `Token ${ml_api_key}`,
        },
    };
    const response = await axios.post(ml_api_url, body, options);
    return res.status(200).json({
        data: response.data,
    });
});

module.exports = router;
