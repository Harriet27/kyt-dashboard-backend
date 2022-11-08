const express = require('express');
const axios = require('axios');
const router = express.Router();
const puppeteer = require('puppeteer');

router.get('/playground', (req, res, next) => {
  (async() => {

    console.log('Starting...');
    let url = 'http://www.worldfloraonline.org/taxon/wfo-0000948337';

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    console.log('Opening page...');

    await page.goto(url, { waitUntil: 'networkidle2' });

    let data = await page.evaluate(() => {
      let name = document.getElementsByClassName("taxonName")[0].innerText;
      return {
        plant_name: name,
      };
    });
    console.log('data: ', data);
    res.status(200).send(data);

    debugger;

    await browser.close();
  })();
});

router.post('/linkedin-post-comments', (req, res, next) => {
  (async() => {

    console.log('Starting...');
    const url = req.query.url;

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    console.log('Opening page...');

    await page.goto(url, { waitUntil: 'networkidle2' });

    let data = await page.evaluate((body) => {
      let commentsArr = [...document.querySelectorAll("div[class='attributed-text-segment-list__container relative mt-1 mb-1.5']>p[dir='ltr']:not(p[data-test-id='main-feed-activity-card__commentary'])")].map(i => i.innerText);
      return {
        comments: commentsArr,
      };
    });
    console.log('data: ', data);
    res.status(200).send(data);

    debugger;

    await browser.close();
  })();
});

router.post('/twitter-post-stats', (req, res, next) => {
  (async() => {

    console.log('Starting...');
    const url = req.query.url;

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    console.log('Opening page...');

    await page.goto(url, { waitUntil: 'networkidle2' });

    let data = await page.evaluate((url) => {
      let retweetsNum = document.querySelector(`a[href="${url.split("").slice(19).join("")}/retweets"]`).querySelector('div').querySelector('span').querySelector('span').querySelector('span').innerText;
      let quoteTweetsNum = document.querySelector(`a[href="${url.split("").slice(19).join("")}/retweets/with_comments"]`).querySelector('div').querySelector('span').querySelector('span').querySelector('span').innerText;
      let likesNum = document.querySelector(`a[href="${url.split("").slice(19).join("")}/likes"]`).querySelector('div').querySelector('span').querySelector('span').querySelector('span').innerText;
      return {
        retweets: retweetsNum,
        quoteTweets: quoteTweetsNum,
        likes: likesNum,
      };
    }, url);
    console.log('data: ', data);
    res.status(200).send(data);

    debugger;

    await browser.close();
  })();
});

router.post('/twitter-post-comments', (req, res, next) => {
  (async() => {

    console.log('Starting...');
    const url = req.query.url;

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    console.log('Opening page...');

    await page.goto(url, { waitUntil: 'networkidle2' });

    let data = await page.evaluate(() => {
      let repliesNum = [...document.querySelectorAll('div[data-testid="tweetText"]')].slice(1).map(i => i.innerText);
      return {
        replies: repliesNum,
      };
    });
    console.log('data: ', data);
    res.status(200).send(data);

    debugger;

    await browser.close();
  })();
});

module.exports = router;
