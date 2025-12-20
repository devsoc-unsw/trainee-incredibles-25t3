"use client"

/* --------------------------------- Imports -------------------------------- */

import { SearchFilterDropdown } from "@/components/SearchFilterDropdown";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { RestaurantFilterProvider, useRestaurantFilter } from "@/contexts/RestaurantFilterContext";
import { useEffect, useMemo, useState } from "react";

/* ------------------------------- Demo Types ------------------------------- */

const CuisineOptions = [
  "Thai",
  "Chinese",
  "Japanese",
  "Indian",
  "Korean",
];

const DietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Halal",
  "Dairy-free",
];

const PriceOptions = [
  "Cheap",
  "Moderate",
  "Expensive",
];

/* -------------------------------------------------------------------------- */
/*                              Main Search Page                              */
/* -------------------------------------------------------------------------- */
export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const { setFilteredRestaurantIds } = useRestaurantFilter();

  // Filter States + Values
  const [cuisine, setCuisine] = useState("");
  const [cuisineSelectOpen, setCuisineSelectOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [priceSelectOpen, setPriceSelectOpen] = useState(false);
  const [dietary, setDietary] = useState("");
  const [dietarySelectOpen, setDietarySelectOpen] = useState(false);

  // switch to this definition when integrating backend
  // const restaurants = useMemo(());
  const restaurants = [
    {
      id: "0",
      name: "Home Ground"
    }, {
      id: "1",
      name: "Yallah Eats",
    }, {
      id: "2",
      name: "The Little Marionette"
    }
  ];

  const searchResults = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return restaurants;
    return restaurants.filter(
      (r) => 
        r.name.toLowerCase().includes(query)
    );
  }, [searchTerm, restaurants]);

  useEffect(() => {
    setFilteredRestaurantIds(searchResults.map(c => c.id));
  }, [searchTerm, searchResults, setFilteredRestaurantIds]);

  const clearFilters = () => {
    setPrice("");
    setCuisine("");
    setDietary("");
  }

  return (
    <RestaurantFilterProvider>

      <div className="flex flex-col">
        {/* Search + Sort */}
        <div className="flex flex-row">
          <Input
            value={searchTerm}
            placeholder="Search..."
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Card>
            <CardHeader>
              Sort By
            </CardHeader>
            <CardContent>
              {/* sorting options */}
            </CardContent>
          </Card>
        </div>

        {/* Filters + Results */}
        <div className="flex flex-row">
          <Card>
            <CardHeader>
              Filters
            </CardHeader>
            <CardDescription>
              Select filters you want to apply to your search
            </CardDescription>
            <CardContent>
              {/* Cuisine */}
              <SearchFilterDropdown 
                label="cuisine"
                value={cuisine}
                setValue={setCuisine}
                open={cuisineSelectOpen}
                setOpen={setCuisineSelectOpen}
                valOptions={CuisineOptions}
              />

              {/* Price */}
              <SearchFilterDropdown 
                label="price"
                value={price}
                setValue={setPrice}
                open={priceSelectOpen}
                setOpen={setPriceSelectOpen}
                valOptions={PriceOptions}
              />

              {/* Dietary */}
              <SearchFilterDropdown 
                label="dietary"
                value={dietary}
                setValue={setDietary}
                open={dietarySelectOpen}
                setOpen={setDietarySelectOpen}
                valOptions={DietaryOptions}
              />
            </CardContent>

            <CardFooter>
              <Button onClick={clearFilters}>
                Clear Filters
              </Button>
              {/* Clear button, Apply Filters button (don't really need it, we can use the SearchContext to make it responsive) */}
            </CardFooter>
          </Card>

          <div>
            {/* RESULTS */}
          </div>

        </div>
      </div>
    </RestaurantFilterProvider>
  )
}