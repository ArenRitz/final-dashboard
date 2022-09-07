const express = require('express');
const router = express.Router();
const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
});

/* GET requests to /spotify page. */
router.get('/refresh', function (req, res, next) {

  spotifyApi.clientCredentialsGrant().then(
    function (data) {
      console.log('The access token expires in ' + data.body['expires_in']);
      console.log('The access token is ' + data.body['access_token']);
      const token = data.body['access_token'];
      const tokenExpiry = data.body['expires_in'];
      const tokenTime = Date.now();
      spotifyApi.setAccessToken(data.body['access_token']);

      return res.send({ token, tokenExpiry, tokenTime})
    },
    function (err) {
      console.log('Something went wrong when retrieving an access token', err);
    }
  );
});

module.exports = router;
