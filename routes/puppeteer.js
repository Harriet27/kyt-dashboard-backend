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
    const query = req.body.query; // array of strings
    const from = req.body.from; // 1 account only
    const since = req.body.since; // yyyy-mm-dd
    const until = req.body.until; // yyyy-mm-dd
    const url = `https://twitter.com/search?q=(${encodeJoinUrl(query)})%20(from%3A${from})%20until%3A${until}%20since%3A${since}&src=typed_query`;

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    console.log('Opening page...');

    await page.goto(url, { waitUntil: 'networkidle2' });
    console.log('Page opened!');

    let data = await page.evaluate((query, from, since, until, url) => {
      let tweet_id_arr = [...document.getElementsByTagName("time")].map((i) => i.parentElement.getAttributeNode("href").value);
      let tweet_id_results = tweet_id_arr.map((i) => i.split('/')[i.split('/').length-1]);
      let tweet_url_results = tweet_id_arr.map((i) => `https://twitter.com${i}`);
      return {
        searched_query: query,
        searched_from: from,
        searched_since: since,
        searched_until: until,
        crawled_url: url,
        // tweet_id_results: tweet_id_arr.map((i) => i.split('/')[i.split('/').length-1]),
        // tweet_url_results: tweet_id_arr.map((i) => `https://twitter.com${i}`),
        results: tweet_url_results,
      };
    }, query, from, since, until, url);
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

router.post('/twitter-post-replies', (req, res, next) => {
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
      let replyName = [...document.querySelectorAll('div[data-testid="User-Names"]')].slice(1).map((i) => {
        let name = i.innerText;
        return name.split('\n')[1];
      });
      return {
        tweet_id: url.split('/')[url.split('/').length-1],
        replies: repliesNum,
        user: replyName,
      };
    }, url);
    console.log('data: ', data);
    res.status(200).send(data);

    debugger;

    await browser.close();
  })();
});

router.post('/twitter-post-replies-analised', async (req, res, next) => {
  (async() => {
    console.log('Starting...');
    const url = req.query.url;

    let browser = await puppeteer.launch();
    let page = await browser.newPage();
    console.log('Opening page...');

    await page.goto(url, { waitUntil: 'networkidle2' });
    console.log('Page opened!');

    let tweet_id = url.split('/')[url.split('/').length-1];

    let repliesData = await page.evaluate((url) => {
      let repliesNum = [...document.querySelectorAll('div[data-testid="tweetText"]')].slice(1).map((i) => i.innerText);
      let replyName = [...document.querySelectorAll('div[data-testid="User-Names"]')].slice(1).map((i) => {
        let name = i.innerText;
        return name.split('\n')[1];
      });
      return {
        tweet_id: url.split('/')[url.split('/').length-1],
        replies: repliesNum,
        user: replyName,
      };
    }, url);
    console.log('repliesData: ', repliesData);

    debugger;

    await browser.close();

    const body = {
      data: repliesData.replies,
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
        options,
      );
      console.log('Sent to MonkeyLearn!', response.data);
      var analysis = response.data.map(item => {
        return item?.classifications?.map(({ tag_name, confidence }) => {
          return { tag_name, confidence };
        });
      });
      const flatAnalysis = analysis.flat();
      const result = flatAnalysis.map((item1, idx) => {
        return ({
          ...item1,
          tweet: repliesData.replies[idx],
          user: repliesData.user[idx],
        })
      });
      console.log('Analysis finished!');
      return res.status(200).send({
        tweet_id,
        replies: result,
      });
    } catch (err) {
      console.log("err", err);
      return res.status(500).send(err);
    }
  })();
});

module.exports = router;
