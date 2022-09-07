import React, { useState } from "react";
import Aztro from "./components/horoscopeWidget";
import WidgetRecipe from "./components/WidgetRecipe";
import Clock from "./components/digitalClock";
import "./App.css";
import BookmarkCategory from "./components/BookmarkCategory";
import WeatherCustom from "./components/WeatherCustom";
import TwitchWidgetList from "./components/TwitchWidgetList";
import WidgetSpotify from "./components/WidgetSpotify";
import Settings from "./components/Settings";
import Button from "./components/Button";

function App() {
  const [show, setShow] = useState({
    Aztro: true,
    Recipe: true,
    Clock: true,
    Bookmarks: true,
    Weather: true,
    Twitch: true,
    Spotify: true,
    Settings: false,
  });

  const hideComponenet = (e) => {
    console.log(show.Bookmarks);
    console.log("trying to delete");
    const { name } = e.target;
    setShow((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  return (
    <div className="App">
      {show.Aztro ? <Aztro click={hideComponenet} /> : null}
      <br></br>

      {show.Twitch ? (
        <TwitchWidgetList click={hideComponenet} showBool={show.Twitch} />
      ) : null}
      <br></br>

      {show.Recipe ? (
        <WidgetRecipe click={hideComponenet} showBool={show.Recipe} />
      ) : null}
      <br></br>

      {show.Clock ? (
        <Clock click={hideComponenet} showBool={show.Clock} />
      ) : null}
      <br></br>

      {show.Bookmarks ? (
        <BookmarkCategory click={hideComponenet} showBool={show.Bookmarks} />
      ) : null}
      <br></br>

      {show.Weather ? (
        <WeatherCustom click={hideComponenet} showBool={show.Weather} />
      ) : null}
      <br></br>

      {show.Spotify ? (
        <WidgetSpotify click={hideComponenet} showBool={show.Spotify} />
      ) : null}
      <br></br>

      {show.Settings ? (
        <Settings click={hideComponenet} showBools={show} />
      ) : null}

      <div className="fixed top-1/3 right-0 h-1/3 w-1/6 group">
        <div className="bg-slate-500 fixed top-1/2 -right-8 h-20 w-8 rounded-l-2xl flex flex-col justify-around invisible transition transform group-hover:visible group-hover:transform group-hover:transition-all group-hover:-translate-x-8">
          <Button type="settings" click={hideComponenet} name="Settings" />
          <Button type="edit" click={hideComponenet} name="Edit" />
        </div>
      </div>
    </div>
  );
}

export default App;
