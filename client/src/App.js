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
import Maps from "./components/Maps";
import useUserData from "./hooks/useUserData";
import useLocation from "./hooks/useLocation";
import { default as Auth } from "./components/Auth/Index";
import axios from "axios";

function App() {
  const [theme, setTheme] = useState("dark");
  const [show, setShow] = useState({
    Horoscope: true,
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
  const [mode, setMode] = useState("view");

  //function to update userID state when user logs in
  const handleLogin = (id) => {
    setUserID(id);
  };

  const html = document.querySelector("html");
  html.setAttribute("data-theme", `${theme}`);

  const { userData, setUserData } = useUserData(userID); //getter and setter for the current user's data in state(currently defaulted to user_id 1)

  useEffect(() => {
    console.log("Current userData: ", userData);
    const getVisibility = (userID) => {
      axios.get(`http://localhost:8080/api/widgets/${userID}`).then((res) => {
        const formattedVisibility = formatVisibility(res.data);
        setShow({ ...formattedVisibility });
      });
    };

    getVisibility(userID);
  }, [userID, userData]);

  const { currLocation } = useLocation();

  const hideComponent = (e) => {
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

  // change mode based on value passed
  const changeMode = (value) => {
    setMode(value);
  };

  const formatVisibility = (visibility) => {
    const formattedVisibility = {};
    visibility.forEach((widget) => {
      formattedVisibility[widget.name] = widget.visibility;
    });
    return formattedVisibility;
  };

  //function to update the visibility of widgets in the database
  const setVisibility = (name, value) => {
    axios
      .put(`http://localhost:8080/api/widgets/${userID}`, {
        name,
        visibility: value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handle visibility change via toggle button in settings to update database and state
  const handleVisibilityChange = (widget, currentShowStatus) => {
    const name = widget;
    const value = !currentShowStatus;
    setShow((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setVisibility(name, value);
  };

  return (
    <div className="App">
      {userID && (
        <>
          <div className="flex flex-row  w-[100%] h-[100vh] mt-2">
            <div className="flex flex-col  w-[25%] h-max">
              <div>
                {show.Clock && (
                  <Clock
                    click={hideComponent}
                    showBool={show.Clock}
                    mode={mode}
                  />
                )}
              </div>
              <br></br>
            </div>

            <div className="flex flex-col items-center justify-center w-[50%] h-max">
              <div className="flex flex-row mt-[7.5rem]">
                <div className="mr-2">
                  {show.Bookmarks && (
                    <BookmarkCategory
                      click={hideComponent}
                      showBool={show.Bookmarks}
                      userID={userID}
                      mode={mode}
                    />
                  )}
                </div>
                <br></br>
                <div className="ml-2">
                  {show.Maps && (
                    <Maps
                      userData={userData}
                      currentLocation={currLocation}
                      click={hideComponent}
                      showBool={show.Maps}
                      mode={mode}
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-row w-[800px] justify-around mt-2">
                <div className="mx-2">
                  {show.Horoscope && (
                    <Horoscope
                      userID={userID}
                      horoscope={userData.horoscope_sign}
                      click={hideComponent}
                      showBool={show.Horoscope}
                      mode={mode}
                    />
                  )}
                </div>
                <div className="mx-2">
                  {show.Spotify && (
                    <WidgetSpotifyList
                      click={hideComponent}
                      showBool={show.Spotify}
                      mode={mode}
                    />
                  )}
                </div>
                <div className="mx-2">
                  {show.Recipe && (
                    <WidgetRecipe
                      click={hideComponent}
                      showBool={show.Recipe}
                      mode={mode}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center w-[25%] h-max">
              <div>
                {show.Weather && (
                  <WeatherCustom
                    currentLocation={currLocation}
                    click={hideComponent}
                    showBool={show.Weather}
                    mode={mode}
                  />
                )}
              </div>
            </div>
          </div>

          {show.Twitch && (
            <TwitchWidgetList
              click={hideComponent}
              showBool={show.Twitch}
              mode={mode}
            />
          )}
          <br></br>

          <br></br>

          <br></br>

          {show.Settings && (
            <Settings
              click={hideComponent}
              themeChange={handleThemeChange}
              theme={theme}
              showBools={show}
              mode={mode}
              setUserData={setUserData}
              setVisibility={handleVisibilityChange}
              userID={userID}
            />
          )}

          <div className="fixed top-1/3 right-0 h-1/3 w-1/6 group">
            <div className="bg-slate-500 fixed top-1/2 -right-8 h-20 w-8 rounded-l-2xl flex flex-col justify-around tranform transition-all group-hover:transform group-hover:transition-all group-hover:-translate-x-8 group-hover:after:translate-x-8">
              <Button type="settings" click={hideComponent} name="Settings" />
              {mode === "view" && (
                <Button type="edit" click={changeMode} name="edit" />
              )}
              {mode === "edit" && (
                <Button type="stopedit" click={changeMode} name="view" />
              )}
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
