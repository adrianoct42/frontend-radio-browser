import Favorites from "./components/Favorites";
import Search from "./components/Search";

function App() {
  return (
    <>
      <div className="flex h-screen">
        <div className="w-3/10 bg-[#1E1E21] justify-center flex">
          <Search />
        </div>
        <div className="w-7/10 bg-[#2F2F33] justify-center flex">
          <Favorites />
        </div>
      </div>
    </>
  );
}

export default App;
