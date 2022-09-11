import React, { useState, useEffect } from "react";
import Horoscope from "./components/horoscopeWidget";
import WidgetRecipe from "./components/WidgetRecipe";
import Clock from "./components/digitalClock";
import "./App.css";
import BookmarkCategory from "./components/BookmarkCategory";
import WeatherCustom from "./components/WeatherCustom";
import TwitchWidgetList from "./components/TwitchWidgetList";

import WidgetSpotifyList from "./components/WidgetSpotifyList";
import Settings from "./components/Settings";
import Button from "./components/Button";
import Maps from './components/Maps';
import useUserData from "./hooks/useUserData";
import useLocation from "./hooks/useLocation";
import { default as Auth } from "./components/Auth/Index";


function App() {
  const [theme, setTheme] = useState("dark");
  const [show, setShow] = useState({
    Aztro: true,
    Recipe: true,
    Clock: true,
    Bookmarks: true,
    Weather: true,
    Twitch: true,
    Spotify: true,
    Maps: true,
    Settings: false,
  });
  const [userID, setUserID] = useState(1); // ******* CHANGE THIS TO NULL TO TEST LOGIN *******

  //function to update userID state when user logs in
  const handleLogin = (id) => {
    setUserID(id);
  };

  const html = document.querySelector('html');
  html.setAttribute('data-theme', `${theme}`);

  const { userData, setUserData } = useUserData(1); //getter and setter for the current user's data in state(currently defaulted to user_id 1)

  useEffect(() => {
    // console.log("Current userData: ", userData);
  }, [userID, userData]);

  const { currLocation } = useLocation();
  console.log("Current Location: ", currLocation)

  const hideComponenet = (e) => {
    console.log(show.Bookmarks);
    console.log("trying to delete");
    const { name } = e.target;
    setShow((prevState) => ({
      ...prevState,
      [name]: !prevState[name],
    }));
  };

  //handle theme change via drop down menu
  const handleThemeChange = (e) => {
    const { value } = e.target;
    setTheme(value);
  };

  // console.log("This is line 71: ", userData);

  return (
    <div className="App">
      {userID && (
        <>
          {show.Aztro && <Horoscope userID={userID} horoscope={userData.horoscope_sign} click={hideComponenet} showBool={show.Aztro} />}
          <br></br>

          {show.Twitch && (
            <TwitchWidgetList click={hideComponenet} showBool={show.Twitch} />
          )}
          <br></br>

          {show.Recipe && (
            <WidgetRecipe click={hideComponenet} showBool={show.Recipe} />
          )}
          <br></br>

          {show.Clock && <Clock click={hideComponenet} showBool={show.Clock} />}
          <br></br>

          {show.Bookmarks && (
            <BookmarkCategory
              click={hideComponenet}
              showBool={show.Bookmarks}
              userID={userID}
            />
          )}
          <br></br>

          {show.Weather && (
            <WeatherCustom currentLocation={currLocation} click={hideComponenet} showBool={show.Weather} />
          )}
          <br></br>

          {show.Spotify && (
            <WidgetSpotifyList click={hideComponenet} showBool={show.Spotify} />
          )}
          <br></br>

          {show.Maps && <Maps home={userData.home_location} work={userData.work_location} currentLocation={currLocation} click={hideComponenet} showBool={show.Maps} />}

          {show.Settings && (
            <Settings
              click={hideComponenet}
              themeChange={handleThemeChange}
              theme={theme}
              showBools={show}
            />
          )}

          <div className="fixed top-1/3 right-0 h-1/3 w-1/6 group">
            <div className="bg-slate-500 fixed top-1/2 -right-8 h-20 w-8 rounded-l-2xl flex flex-col justify-around tranform transition-all group-hover:transform group-hover:transition-all group-hover:-translate-x-8 group-hover:after:translate-x-8">
              <Button type="settings" click={hideComponenet} name="Settings" />
              <Button type="edit" click={hideComponenet} name="Edit" />
            </div>
          </div>
        </>
      )}
      {!userID && (
        <>
          <Auth userID={userID} handleLogin={handleLogin} />
        </>
      )}
    </div>
  );
}

export default App;
