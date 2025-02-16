import { useEffect, useRef, useState } from "react";
import "react-h5-audio-player/lib/styles.css";
import { useFavorites } from "../contexts/FavoritesContext";

interface FavoriteItem {
  id: string;
  name: string;
  country: string;
  url_resolved: string;
}

const Favorites = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredFavorites, setFilteredFavorites] = useState<FavoriteItem[]>([]);
  const { favorites, setFavorites } = useFavorites();
  const [currentRadio, setCurrentRadio] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    const filtered = Object.values(favorites).filter((favorite) => {
      return favorite.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    setFilteredFavorites(filtered);
    console.log(filtered);
  }, [searchTerm, favorites]);

  const handlePlayPause = (url: string) => {
    if (currentRadio === url && isPlaying) {
      audioRef.current?.pause();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        audioRef.current.src = url;
        audioRef.current.play().catch((error) => {
          console.error("Error playing audio:", error);
        });
      }
      setCurrentRadio(url);
      setIsPlaying(true);
    }
  };

  function handleDeleteFavorite(id: string): void {
    localStorage.removeItem(id);
    const newFavorites = { ...favorites };
    delete newFavorites[id];
    setFavorites(newFavorites);
  }

  return (
    <>
      <div className="w-full min-h-screen">
        <div className="flex justify-center my-5">
          <h1 className="text-white font-bold text-2xl items-center">Radio Browser</h1>
        </div>
        <div className="mx-5 flex justify-between">
          <h1 className="text-white font-bold text-xl mt-5">Favorite Radios</h1>
          <input
            className="rounded-lg bg-[#4D4D56] text-[#FFFFFF] mx-5 p-3"
            type="text"
            placeholder="Search favorite radios"
            value={searchTerm}
            onChange={handleChange}
          />
        </div>
        <ul>
          {searchTerm
            ? filteredFavorites.map((favorite) => (
                <li key={favorite.name} className="flex mx-3">
                  <div className="w-full px-3">
                    <button className="mt-5 px-3 bg-[#4D4D56] rounded-2xl h-15 w-full flex items-center text-white">
                      <svg
                        onClick={() => handlePlayPause(favorite.url_resolved)}
                        width="54"
                        height="48"
                        viewBox="0 0 54 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M54 24C54 37.2562 41.9133 48 27 48C12.0867 48 0 37.2562 0 24C0 10.7438 12.0867 0 27 0C41.9133 0 54 10.7438 54 24Z"
                          fill="black"
                          fillOpacity="0.5"
                        />
                        {currentRadio === favorite.url_resolved && isPlaying ? (
                          <path
                            d="M26 3.625V18.074C26 20.0763 24.0602 21.699 21.6667 21.699H4.33333C1.93984 21.699 0 20.0763 0 18.074V3.625C0 1.62275 1.93984 0 4.33333 0H21.6667C24.0568 0 26 1.62275 26 3.625Z"
                            fill="black"
                            transform="translate(13, 14)"
                          />
                        ) : (
                          <path
                            d="M24.4427 12.2566C25.4109 12.8459 26 13.8841 26 15.0026C26 16.121 25.4109 17.1592 24.4427 17.6883L4.94474 29.4759C3.9413 30.139 2.68531 30.1658 1.66021 29.5965C0.634901 29.0272 0 27.9556 0 26.7902V3.21488C0 2.05219 0.634901 0.979916 1.66021 0.410625C2.68531 -0.157996 3.9413 -0.134555 4.94474 0.471573L24.4427 12.2566Z"
                            fill="black"
                            transform="translate(14, 9)"
                          />
                        )}
                      </svg>
                      <div className="ml-3 flex flex-col items-start">
                        <h1 className="text-lg">{favorite.name}</h1>
                        <h2 className="text-sm text-left">{favorite.country}</h2>
                      </div>
                      <svg
                        onClick={() => handleDeleteFavorite(favorite.id)}
                        className="ml-auto flex-shrink-0"
                        width="26"
                        height="27"
                        viewBox="0 0 26 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1_18)">
                          <path
                            d="M7.84643 0.932871C8.15982 0.361125 8.80402 0 9.50625 0H16.4937C17.196 0 17.8402 0.361125 18.1536 0.932871L18.5714 1.6875H24.1429C25.1701 1.6875 26 2.44318 26 3.375C26 4.30682 25.1701 5.0625 24.1429 5.0625H1.85714C0.831652 5.0625 0 4.30682 0 3.375C0 2.44318 0.831652 1.6875 1.85714 1.6875H7.42857L7.84643 0.932871ZM22.9125 24.5795C22.8196 25.9611 21.6067 27 20.1326 27H5.86741C4.3962 27 3.17862 25.9611 3.08692 24.5795L1.80491 6.75H24.1429L22.9125 24.5795Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_18">
                            <rect width="26" height="27" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </li>
              ))
            : Object.values(favorites).map((favorite) => (
                <li key={favorite.name} className="flex mx-3">
                  <div className="w-full px-3">
                    <button className="mt-5 px-3 bg-[#4D4D56] rounded-2xl h-15 w-full flex items-center text-white">
                      <svg
                        onClick={() => handlePlayPause(favorite.url_resolved)}
                        width="54"
                        height="48"
                        viewBox="0 0 54 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M54 24C54 37.2562 41.9133 48 27 48C12.0867 48 0 37.2562 0 24C0 10.7438 12.0867 0 27 0C41.9133 0 54 10.7438 54 24Z"
                          fill="black"
                          fillOpacity="0.5"
                        />
                        {currentRadio === favorite.url_resolved && isPlaying ? (
                          <path
                            d="M26 3.625V18.074C26 20.0763 24.0602 21.699 21.6667 21.699H4.33333C1.93984 21.699 0 20.0763 0 18.074V3.625C0 1.62275 1.93984 0 4.33333 0H21.6667C24.0568 0 26 1.62275 26 3.625Z"
                            fill="black"
                            transform="translate(13, 14)"
                          />
                        ) : (
                          <path
                            d="M24.4427 12.2566C25.4109 12.8459 26 13.8841 26 15.0026C26 16.121 25.4109 17.1592 24.4427 17.6883L4.94474 29.4759C3.9413 30.139 2.68531 30.1658 1.66021 29.5965C0.634901 29.0272 0 27.9556 0 26.7902V3.21488C0 2.05219 0.634901 0.979916 1.66021 0.410625C2.68531 -0.157996 3.9413 -0.134555 4.94474 0.471573L24.4427 12.2566Z"
                            fill="black"
                            transform="translate(14, 9)"
                          />
                        )}
                      </svg>
                      <div className="ml-3 flex flex-col items-start">
                        <h1 className="text-lg">{favorite.name}</h1>
                        <h2 className="text-sm text-left">{favorite.country}</h2>
                      </div>
                      <svg
                        onClick={() => handleDeleteFavorite(favorite.id)}
                        className="ml-auto flex-shrink-0"
                        width="26"
                        height="27"
                        viewBox="0 0 26 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1_18)">
                          <path
                            d="M7.84643 0.932871C8.15982 0.361125 8.80402 0 9.50625 0H16.4937C17.196 0 17.8402 0.361125 18.1536 0.932871L18.5714 1.6875H24.1429C25.1701 1.6875 26 2.44318 26 3.375C26 4.30682 25.1701 5.0625 24.1429 5.0625H1.85714C0.831652 5.0625 0 4.30682 0 3.375C0 2.44318 0.831652 1.6875 1.85714 1.6875H7.42857L7.84643 0.932871ZM22.9125 24.5795C22.8196 25.9611 21.6067 27 20.1326 27H5.86741C4.3962 27 3.17862 25.9611 3.08692 24.5795L1.80491 6.75H24.1429L22.9125 24.5795Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1_18">
                            <rect width="26" height="27" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
        </ul>
        <audio ref={audioRef} />
      </div>
    </>
  );
};

export default Favorites;
