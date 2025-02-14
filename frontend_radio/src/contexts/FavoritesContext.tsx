import React, { createContext, useState, ReactNode, useContext, useEffect } from "react";

interface FavoriteItem {
  id: string;
  name: string;
  country: string;
  url_resolved: string;
}

interface FavoritesContextType {
  favorites: { [key: string]: FavoriteItem };
  setFavorites: React.Dispatch<React.SetStateAction<{ [key: string]: FavoriteItem }>>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
  children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
  const [favorites, setFavorites] = useState<{
    [key: string]: FavoriteItem;
  }>({});

  useEffect(() => {
    const loadFavorites = () => {
      const allFavorites: { [key: string]: FavoriteItem } = {};
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key) {
          allFavorites[key] = {
            id: key,
            name: JSON.parse(localStorage.getItem(key) || "").name,
            country: JSON.parse(localStorage.getItem(key) || "").country,
            url_resolved: JSON.parse(localStorage.getItem(key) || "").url_resolved,
          };
        }
      }
      setFavorites(allFavorites);
    };

    loadFavorites();
  }, []);

  return <FavoritesContext.Provider value={{ favorites, setFavorites }}>{children}</FavoritesContext.Provider>;
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
};
