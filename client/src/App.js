import WidgetRecipe from "./component/WidgetRecipe";
import "./App.css";

function App() {
  return <div className="h-screen w-screen">
    <div className="h-1/4 w-1/4">
    <button onClick={() => console.log('hello')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Button </button>
    </div>

    <div>
      <WidgetRecipe />
    </div>

  </div>;
}

export default App;
