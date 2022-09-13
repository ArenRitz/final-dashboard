const express = require('express');
const axios = require('axios');
const cors = require('cors')
const SpotifyWebApi = require('spotify-web-api-node');
const router = express.Router();
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const spotifyRouter = require('./routes/spotify');
const bookmarksRouter = require('./routes/bookmarks');
const apiRouter = require('./routes/api');
const horoscopesRouter = require('./routes/horoscopes');
const timezoneRouter = require('./routes/timezone');

const app = express();

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
app.use('/timezone', timezoneRouter);

module.exports = app;
