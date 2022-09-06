import React, {useState} from 'react';
import Aztro from './components/horoscopeWidget';
import WidgetRecipe from "./components/WidgetRecipe";
import Clock from './components/digitalClock';
import "./App.css";
import BookmarkCategory from "./components/BookmarkCategory";
import WeatherCustom from "./components/WeatherCustom";
import TwitchWidgetList from "./components/TwitchWidgetList";
import WidgetSpotify from './components/WidgetSpotify';
import Button from './components/Button';

function App() {

  const [show , setShow] = useState({
    Aztro: true,
    Recipe: true,
    Clock: true,
    Bookmarks: true,
    Weather: true,
    Twitch: true,
    Spotify: true
  })

  const hideShow =  (e) => {
    const {name} = e.target;
    setShow(prevState => ({
      ...prevState,
      [name]: !prevState[name]
    }))
  }



  return (
    <div className="App">

            {show.Aztro ? <Aztro /> : null}
            <br></br>

            {show.Recipe ? <WidgetRecipe /> : null}
            <br></br>

            {show.Clock ? <Clock /> : null}
            <br></br>
  
            {show.Bookmarks ? <BookmarkCategory click={hideShow} /> : null}
            <br></br>

            {show.Weather ? <WeatherCustom /> : null}
            <br></br>
        
            {show.Twitch ? <TwitchWidgetList /> : null}
            <br></br>
 
            {show.Spotify ? <WidgetSpotify /> : null}

      </div>
  );
}

export default App;
