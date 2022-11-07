const express = require('express');
const axios = require('axios');
const router = express.Router();
const puppeteer = require('puppeteer');

router.get('/1', (req, res, next) => {
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

router.get('/2', (req, res, next) => {
  (async() => {

    console.log('Starting...');
    let url = 'https://www.linkedin.com/posts/janetchoo_tweeps-twitter-openforwork-activity-6994441225802043392-HpFV/';
    // let url = 'https://www.linkedin.com/posts/jseyehunts_friday-memes-programmingcoding-memes-activity-6994275735142105088-9DnT/';

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    console.log('Opening page...');

    await page.goto(url, { waitUntil: 'networkidle2' });

    let data = await page.evaluate((body) => {
      // let commentsArr = [...document.querySelectorAll("span[class='comment__message font-sans text-sm text-color-text inline-block break-words hyphens-auto']")].map(item => item.innerText);
      // let commentsArr = [...document.querySelectorAll("p[dir='ltr']")].map(item => item.innerText);
      // let commentsArr = [...document.querySelectorAll("p[class='attributed-text-segment-list__content text-color-text text-sm whitespace-pre-wrap break-words']")].map(item => item.innerText);
      let commentsArr = [...document.querySelectorAll("div[class='attributed-text-segment-list__container relative mt-1 mb-1.5']")].map(item => item.innerText);
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

module.exports = router;
