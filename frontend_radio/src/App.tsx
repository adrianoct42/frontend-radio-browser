import "./App.css";
import Search from "./components/Search";

function App() {
  //const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/4 bg-gray-600 justify-center flex">
          <Search />
        </div>
        <div className="w-3/4 bg-gray-300 justify-center flex">
          <h1>How do you guys do?</h1>
        </div>
      </div>
    </>
  );
}

export default App;
