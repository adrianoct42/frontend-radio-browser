import React, { useEffect } from "react";
import { useState } from "react";
import RadioController from "../controllers/radioController";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await RadioController.getData();
      setSearchResults(data);
      console.log(data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await RadioController.getData();
      setSearchResults(data);
      console.log(data);
    };

    fetchData();
  }, [searchTerm]);

  return (
    <div className="mt-5">
      <input
        className="rounded-lg bg-[#1E1E21] text-[#FFFFFF] p-3"
        type="text"
        placeholder="Search here"
        value={searchTerm}
        onChange={handleChange}
      />
      <ul className="mt-5 mx-5">
        {searchResults.map((item) => (
          <li
            key={item["id"]}
            className="flex justify-between ml-auto"
          >
            <button
              className="mt-5 pl-3 bg-[#4D4D56] rounded-2xl h-15 w-95/100 flex items-center justify-between text-white"
              onClick={() => console.log(item["url"])}
            >
              {item["name"]}
              <svg
                className="mr-3"
                width="15"
                height="15"
                viewBox="0 0 25 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24.4768 0.704327C25.1744 1.64193 25.1744 3.1571 24.4768 4.0947L10.1903 23.2968C9.49272 24.2344 8.36542 24.2344 7.66784 23.2968L0.52302 13.6958C-0.17434 12.7581 -0.17434 11.243 0.52302 10.3054C1.22049 9.36777 2.35114 9.36777 3.04872 10.3054L8.87884 18.2037L21.9543 0.704327C22.6519 -0.234776 23.7792 -0.234776 24.4768 0.704327Z"
                  fill="#1267FC"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Search;
