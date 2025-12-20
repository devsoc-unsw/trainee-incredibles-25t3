"use client"

/* --------------------------------- Imports -------------------------------- */

import { SearchFilterDropdown } from "@/components/SearchFilterDropdown";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
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
      name: "Home Ground",
      cuisine: "Coffee",
      rating: 4,
      priceLevel: "moderate"
    }, {
      id: "1",
      name: "Yallah Eats",
      cuisine: "Lebanese",
      rating: 4.5,
      priceLevel: "cheap"
    }, {
      id: "2",
      name: "The Little Marionette",
      cuisine: "Coffee",
      rating: 4,
      priceLevel: "expensive"
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
            <div className="flex flex-row">
              <Button>
                Most Popular
              </Button>
              <Button>
                Highest Rated
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters + Results */}
      <div className="flex flex-row">
        <Card className="p-4">
          <CardHeader>
            <CardTitle>
              Filters
            </CardTitle>
            <CardDescription>
              Select filters you want to apply to your search
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Cuisine */}
            <SearchFilterDropdown 
              label="Cuisine"
              value={cuisine}
              setValue={setCuisine}
              open={cuisineSelectOpen}
              setOpen={setCuisineSelectOpen}
              valOptions={CuisineOptions}
            />

            {/* Price */}
            <SearchFilterDropdown 
              label="Price"
              value={price}
              setValue={setPrice}
              open={priceSelectOpen}
              setOpen={setPriceSelectOpen}
              valOptions={PriceOptions}
            />

            {/* Dietary */}
            <SearchFilterDropdown 
              label="Dietary"
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

        <div className="grid grid-cols-4">
          { searchResults.length === 0 ? (
              <span>No restaurants found</span>
            ) : (
              searchResults.map((restaurant) => (
                <Card>
                  <CardTitle>
                    {restaurant.name}
                  </CardTitle>
                  <CardContent>
                    <span>{restaurant.cuisine}</span>
                    <span>{restaurant.rating}</span>
                    <span>{restaurant.priceLevel}</span>
                  </CardContent>
                </Card>
              ))
            )}
        </div>

      </div>
    </div>
  );
}