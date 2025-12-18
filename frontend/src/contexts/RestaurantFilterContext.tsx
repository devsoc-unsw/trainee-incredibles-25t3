"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type RestaurantFilterContextType = {
  filteredRestaurantIds: string[];
  setFilteredRestaurantIds: (ids: string[]) => void;
};

const RestaurantFilterContext = createContext<RestaurantFilterContextType | undefined>(undefined);

export function RestaurantFilterProvider({
  children
} : {
  children: ReactNode
}) {
  const [filteredRestaurantIds, setFilteredRestaurantIds] = useState<string[]>([]);

  return (
    <RestaurantFilterContext.Provider value={{ filteredRestaurantIds, setFilteredRestaurantIds }}>
      {children}
    </RestaurantFilterContext.Provider>
  );
}

export function useRestaurantFilter() {
  const context = useContext(RestaurantFilterContext);
  if (!context) {
    throw new Error("useRestaurantFilter must be used within RestaurantFilterProvider");
  }
  return context;
}