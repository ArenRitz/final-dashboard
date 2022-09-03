import "./App.css";
import Weather from "./components/Weather";


function App() {
  return <div className="h-screen w-screen">
    <div className="h-1/4 w-1/4">
    <button onClick={() => console.log('hello')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Button </button>
    </div>

    <div>
      <h2>Weather Widget Placeholder</h2>
      <Weather location={{lat: '43.6532', lon: '-79.3832'}}/>
    </div>


  </div>;
}

export default App;
