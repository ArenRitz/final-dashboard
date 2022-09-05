import React from 'react';
import Aztro from './components/horoscopeWidget';
import WidgetRecipe from "./components/WidgetRecipe";
import Clock from './components/digitalClock';
import "./App.css";
import BookmarkCategory from "./components/BookmarkCategory";
import Weather from "./components/Weather";
import TwitchWidgetList from "./components/TwitchWidgetList";
import WidgetSpotify from './components/WidgetSpotify';

function App() {
  return (
   <div className="h-screen w-screen">

      <Clock />

      <Weather location={{lat: '43.6532', lon: '-79.3832'}}/>

      <TwitchWidgetList />
      
      <WidgetRecipe />
      
      <BookmarkCategory />

      <Aztro />

      <WidgetSpotify />

      <div className="h-1/4 w-1/4">
        <button onClick={() => console.log('hello')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Button </button>
      </div>

   </div>
   );
}

export default App;
