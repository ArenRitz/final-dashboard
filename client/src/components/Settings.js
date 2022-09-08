import Button from "./Button";
import { useState } from "react";

const Settings = (props) => {
  const [selected, setSelected] = useState("bookmarks");

  const handleClick = (e) => {
    const { name } = e.target;
    setSelected(name);
    console.log(selected);
  };

  const themeOptions = [
    "light",
    "dark",
    "cupcake",
    "bumblebee",
    "emerald",
    "corporate",
    "synthwave",
    "retro",
    "cyberpunk",
    "valentine",
    "halloween",
    "garden",
    "forest",
    "aqua",
    "lofi",
    "pastel",
    "fantasy",
    "wireframe",
    "black",
    "luxury",
    "dracula",
    "cymk",
    "autumn",
    "business",
    "acid",
    "lemonade",
    "night",
    "coffe",
    "winter",
  ];

  return (
    <>
      <div className=" fixed top-1/4 left-1/4 bg-neutral-content w-1/2 rounded-3xl flex flex-row">
        <div className="w-1/4 h-full ">
          <div className="navbar bg-neutral text-neutral-content">
            <button
              className="btn btn-ghost normal-case text-xl"
              onClick={handleClick}
              name="general"
            >
              General
            </button>
          </div>
          <div className="navbar bg-neutral text-neutral-content">
            <button
              className="btn btn-ghost normal-case text-xl"
              onClick={handleClick}
              name="bookmarks"
            >
              Bookmarks
            </button>
          </div>
          <div className="navbar bg-neutral">
            <a
              className="btn btn-ghost normal-case text-xl "
              onClick={handleClick}
              name="twitch"
            >
              Twitch
            </a>
          </div>
          <div className="navbar bg-neutral text-primary-content">
            <a
              className="btn btn-ghost normal-case text-xl"
              onClick={handleClick}
              name="weather"
            >
              Weather
            </a>
          </div>
          <div className="navbar bg-neutral text-neutral-content">
            <a
              className="btn btn-ghost normal-case text-xl"
              onClick={handleClick}
              name="clock"
            >
              Clock
            </a>
          </div>
          <div className="navbar bg-neutral text-neutral-content">
            <a
              className="btn btn-ghost normal-case text-xl"
              onClick={handleClick}
              name="spotify"
            >
              Spotify
            </a>
          </div>
          <div className="navbar bg-neutral text-neutral-content">
            <a
              className="btn btn-ghost normal-case text-xl"
              onClick={handleClick}
              name="recipe"
            >
              Recipe
            </a>
          </div>
          <div className="navbar bg-neutral text-neutral-content">
            <a
              className="btn btn-ghost normal-case text-xl"
              onClick={handleClick}
              name="aztro"
            >
              Aztro
            </a>
          </div>
          <div className="navbar bg-neutral text-neutral-content">
            <a
              className="btn btn-ghost normal-case text-xl"
              onClick={handleClick}
              name="maps"
            >
              Maps
            </a>
          </div>
        </div>
        <div className="w-full">
          {selected === "general" && (
            <>
              <div className="bg-neutral text-neutral-content">General</div>
              <p className="text-primary">Select Theme</p>
              <select
                className="select select-bordered w-full max-w-xs"
                onChange={props.themeChange}
              >
                <option disabled selected>
                  Theme
                </option>
                {themeOptions.map((theme) => (
                  <option value={theme}>{theme}</option>
                ))}
              </select>
            </>
          )}
          {selected === "bookmarks" && (
            <>
              <div className="bg-neutral text-neutral-content">Bookmarks</div>
              <Button
                show={props.showBools.Bookmarks}
                type="hideshow"
                click={props.click}
                name="Bookmarks"
              />
            </>
          )}
          {selected === "twitch" && (
            <>
              <div className="bg-neutral text-neutral-content">Twitch</div>
              <Button
                show={props.showBools.Twitch}
                type="hideshow"
                click={props.click}
                name="Twitch"
              />
            </>
          )}
          {selected === "weather" && (
            <>
              <div className="bg-neutral text-neutral-content">Weather</div>
              <Button
                show={props.showBools.Weather}
                type="hideshow"
                click={props.click}
                name="Weather"
              />
            </>
          )}
          {selected === "clock" && (
            <>
              <div className="bg-neutral text-neutral-content">Clock</div>
              <Button
                show={props.showBools.Clock}
                type="hideshow"
                click={props.click}
                name="Clock"
              />
            </>
          )}
          {selected === "spotify" && (
            <>
              <div className="bg-neutral text-neutral-content">Spotify</div>
              <Button
                show={props.showBools.Spotify}
                type="hideshow"
                click={props.click}
                name="Spotify"
              />
            </>
          )}
          {selected === "recipe" && (
            <>
              <div className="bg-neutral text-neutral-content">Recipe</div>
              <Button
                show={props.showBools.Recipe}
                type="hideshow"
                click={props.click}
                name="Recipe"
              />
            </>
          )}
          {selected === "aztro" && (
            <>
              <div className="bg-neutral text-neutral-content">Aztro</div>
              <Button
                show={props.showBools.Aztro}
                type="hideshow"
                click={props.click}
                name="Aztro"
              />
            </>
          )}
          {selected === "maps" && (
            <>
              <div className="bg-neutral text-neutral-content">Maps</div>
              <Button
                show={props.showBools.Maps}
                type="hideshow"
                click={props.click}
                name="Maps"
              />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Settings;
