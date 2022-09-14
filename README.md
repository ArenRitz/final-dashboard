# StartGate - Personal Browser Dashboard
## Project Description

A customizable personal dashboard, with a focus on simplicity and ease of use. Allows the user to setup the type of information they would like via widgets that are provided with the app. The widgets include:

- Clock
- Weather
- Search Bar
- Bookmarks
- Spotify Playlists with Top-10
- TTC Subway Status
- Google Maps
- Twitch Streamer Status
- Random Recipe

### Widgets
!['Widgets'](https://github.com/ArenRitz/final-dashboard/blob/main/docs/images/Widgets.gif)
**Note** : _Once a user has logged in they are able to view all their widgets and through settings toggle or hide additional widgets.._
### Themes
!['Themes'](https://github.com/ArenRitz/final-dashboard/blob/main/docs/images/Themes.gif)
**Note** : _Logged in users have the ablity of selecting one 20 themes to customize the appearance of their dashboard._

## Client Setup

- Install dependencies with `npm install`.
- Create .env file and ensure all necessary API keys from .env.example are present.

**Note** : _For full functionality of the web application, both of the client and the API server applications must run concurrently (please see below for database* setup)._

Run the server wihth `npm start`.

## API server/*Database Setup

- Install dependencies with `npm install`.
- Create .env file and ensure all necessary API keys from .env.example are present.
- Create a db in psql and ensure information is entered in .env file.
- Once you have the database setup and the server is running and dependencies installed in the root directory, you can run `npm start` from the root directory of the project to launch the web app.  

## Project Stack

__Front-End:__ JavaScript, HTML, JSX, React, Axios, TailwindCSS

__Back-End:__ Express, Node.js, PostgreSQL

__Testing:__ Storybook, Webpack Dev Server

## Dependencies
- Axios
- Babel/core
- Babel-loader
- Cookie-Parser
- Cors
- Classnames
- DaisyUI
- dotenv
- Express
- JavsScript-Time-Ago
- Node.js
- Node-sass
- Morgan
- Normalize.css
- Moment
- Moment-Timezone
- PostgreSQL
- Spotify-Web-Api-Node
- React
- React-Beautiful-DND
- React-Dom
- React-Icons
- React-Live-Clock
- React-Moment
- React-Open-Weather
- React-Scripts
- React-Time-Ago
- React-test-renderer
- Storybook/addon-actions
- Storybook/addon-backgrounds
- Storybook/addon-links
- Storybook/addons
- Storybook/react
- Testing-library/jest-dom
- Testing-library/react
- Testing-library/react-hooks
- Prop-types
- Web-Vitals
