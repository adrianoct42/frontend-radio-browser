import "./App.css";
import Favorites from "./components/Favorites";
import Search from "./components/Search";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-600 justify-center flex">
          <Search />
        </div>
        <div className="w-3/4 bg-gray-300 justify-center flex">
          <Favorites />
        </div>
      </div>
    </>
  );
}

export default App;
