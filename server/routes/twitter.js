const axios = require('axios');
const express = require('express');
const router = express.Router();

const getTweets = () => {
  const twitterUserId = 19025957 // @ttcnotices twitter user ID
  const token = process.env.TWITTER_BEARER_TOKEN 
  const config = {
    method: 'get',
    url: `https://api.twitter.com/2/users/${twitterUserId}/tweets?tweet.fields=created_at`, 
    headers: { 
      Authorization: `Bearer ${token}`, 
      Cookie: 'guest_id=v1%3A166308728881496672'
    }
  }
  return axios(config)
  .then( (res) => {
    // console.log("####### Twitter respose data: ",JSON.stringify(res.data));
    return res.data
  })
  .then()
  .catch( (err) =>  {
    console.log(err);
  });
}

router.get('/transit', (req, res) => {
  getTweets()
  .then((data) => {
    res.json(data)
  })
})

module.exports = router;