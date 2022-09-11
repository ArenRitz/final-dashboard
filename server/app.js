var express = require('express');
const axios = require('axios');
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node');
var router = express.Router();
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const spotifyRouter = require('./routes/spotify');
const bookmarksRouter = require('./routes/bookmarks');
const apiRouter = require('./routes/api');
const horoscopesRouter = require('./routes/horoscopes');








var app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/spotify', spotifyRouter);
app.use('/bookmarks', bookmarksRouter);
app.use('/horoscopes', horoscopesRouter);








app.use('/api', apiRouter);


console.log("I am running on backend server before token refresh request");

module.exports = app;
