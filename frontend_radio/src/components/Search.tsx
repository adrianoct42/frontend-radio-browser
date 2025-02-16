import React, { useEffect, useState } from "react";
import RadioController from "../controllers/radioController";
import { useFavorites } from "../contexts/FavoritesContext";
import FilterButton from "./FilterButton";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string>("");
  const [searchResults, setSearchResults] = useState([]);
  const { favorites, setFavorites } = useFavorites();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleOptionClick = async (option: string) => {
    setFilter(option);
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      const data = await RadioController.getData({
        searchParam: undefined,
        source: undefined,
      });
      setSearchResults(data);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await RadioController.getData({
        searchParam: searchTerm,
        source: filter,
      });
      setSearchResults(data);
    };

    fetchData();
    setFilter("");
  }, [searchTerm, filter]);

  const saveFavorite = (item: never) => {
    const key = item["changeuuid"];
    if (favorites[key]) {
      console.log("Removing favorite...");
      localStorage.removeItem(key);
      setFavorites((prevFavorites) => {
        const newFavorites = { ...prevFavorites };
        delete newFavorites[key];
        return newFavorites;
      });
    } else {
      console.log("Saving favorite...");
      localStorage.setItem(key, JSON.stringify(item));
      setFavorites((prevFavorites) => ({
        ...prevFavorites,
        [key]: {
          id: item["changeuuid"],
          name: item["name"],
          country: item["country"],
          url_resolved: item["url_resolved"],
        },
      }));
    }
  };

  const checkFavorite = (changeuuid: string): boolean => {
    return favorites[changeuuid] ? true : false;
  };

  return (
    <>
      <div className="mt-5 flex flex-col items-center w-full">
        <div className="flex justify-between items-center">
          <input
            className="rounded-lg bg-[#4D4D56] text-[#FFFFFF] mx-5 p-3 flex-grow"
            type="text"
            placeholder="Search here"
            value={searchTerm}
            onChange={handleChange}
          />
          <FilterButton onOptionClick={handleOptionClick} />
        </div>
        <ul className="mt-3 w-full">
          {searchResults.map((item) => (
            <li key={item["changeuuid"]} className="flex justify-between mx-3">
              <button
                className="mt-5 px-3 bg-[#4D4D56] rounded-2xl h-15 w-95/100 flex items-center justify-between text-white"
                onClick={() => saveFavorite(item)}
              >
                {item["name"]}
                {checkFavorite(item["changeuuid"]) ? (
                  <svg
                    className="mr-1"
                    width="10"
                    height="10"
                    viewBox="0 0 25 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24.4768 0.704327C25.1744 1.64193 25.1744 3.1571 24.4768 4.0947L10.1903 23.2968C9.49272 24.2344 8.36542 24.2344 7.66784 23.2968L0.52302 13.6958C-0.17434 12.7581 -0.17434 11.243 0.52302 10.3054C1.22049 9.36777 2.35114 9.36777 3.04872 10.3054L8.87884 18.2037L21.9543 0.704327C22.6519 -0.234776 23.7792 -0.234776 24.4768 0.704327Z"
                      fill="#1267FC"
                    />
                  </svg>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Search;
