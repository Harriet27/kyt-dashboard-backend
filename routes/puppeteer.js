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
    console.log('Page opened!');

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
    console.log('Page opened!');

    let data = await page.evaluate(() => {
      let commentsArr = [...document.querySelectorAll("div[class='attributed-text-segment-list__container relative mt-1 mb-1.5']>p[dir='ltr']:not(p[data-test-id='main-feed-activity-card__commentary'])")].map((i) => i.innerText);
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

router.post('/twitter-advanced-search-or', (req, res, next) => {
  /*
    Example URL 1 (OR Operator):
    > (MH370 OR crash) (from:MAS) (@MAS)
    https://twitter.com/search?q=(MH370%20OR%20crash)%20(from%3AMAS)%20(%40MAS)&src=typed_query
    Example URL 1 (AND Operator):
    > MH370 crash (from:MAS) (@MAS)
    https://twitter.com/search?q=MH370%20crash%20(from%3AMAS)%20(%40MAS)&src=typed_query
  */
  (async() => {
    const encodeJoinUrl = (arr) => {
      return arr.join('%20OR%20');
    };

    console.log('Starting...');
    const query = req.body.query;
    const from = req.body.from;
    const url = `https://twitter.com/search?q=(${encodeJoinUrl(query)})%20(from%3A${from})&src=typed_query`;

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    console.log('Opening page...');

    await page.goto(url, { waitUntil: 'networkidle2' });
    console.log('Page opened!');

    let data = await page.evaluate((query, from, url) => {
      let tweet_id_arr = [...document.getElementsByTagName("time")].map((i) => i.parentElement.getAttributeNode("href").value);
      return {
        searched_query: query,
        searched_from: from,
        searched_url: url,
        tweet_id_arr: tweet_id_arr.map(i => i.split('/')[i.split('/').length-1]),
      };
    }, query, from, url);
    console.log('data:', data);
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
    console.log('Page opened!');

    let data = await page.evaluate((url) => {
      let retweetsNum = document.querySelector(`a[href="${url.split("").slice(19).join("")}/retweets"]`).querySelector('div').querySelector('span').querySelector('span').querySelector('span').innerText;
      let quoteTweetsNum = document.querySelector(`a[href="${url.split("").slice(19).join("")}/retweets/with_comments"]`).querySelector('div').querySelector('span').querySelector('span').querySelector('span').innerText;
      let likesNum = document.querySelector(`a[href="${url.split("").slice(19).join("")}/likes"]`).querySelector('div').querySelector('span').querySelector('span').querySelector('span').innerText;
      return {
        tweet_id: url.split('/')[url.split('/').length-1],
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
    console.log('Page opened!');

    let data = await page.evaluate((url) => {
      let repliesNum = [...document.querySelectorAll('div[data-testid="tweetText"]')].slice(1).map((i) => i.innerText);
      return {
        tweet_id: url.split('/')[url.split('/').length-1],
        replies: repliesNum,
      };
    }, url);
    console.log('data: ', data);
    res.status(200).send(data);

    debugger;

    await browser.close();
  })();
  /*
  (async() => {
    console.log('Starting...');
    const url = req.query.url;

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    console.log('Opening page...');

    await page.goto(url, { waitUntil: 'networkidle2' });
    console.log('Page opened!');

    let data = await page.evaluate(() => {
      if ((document.scrollingElement.scrollTop + window.innerHeight) < document.scrollingElement.scrollHeight) {
        console.log('scrolling...');
        const distance = document.body.scrollHeight;
        const delay = 750;
        const timer = setInterval(() => {
          document.scrollingElement.scrollBy(0, distance);
          if (document.scrollingElement.scrollTop + window.innerHeight >= document.scrollingElement.scrollHeight) {
            clearInterval(timer);
          }
        }, delay);
      } else {
        console.log('finished scrolling!');
        let repliesNum = [...document.querySelectorAll('div[data-testid="tweetText"]')].slice(1).map((i) => i.innerText);
        return {
          replies: repliesNum,
        };
      }
    });
    console.log('data: ', data);
    res.status(200).send(data);

    debugger;

    await browser.close();
  })();
  */
});

module.exports = router;
