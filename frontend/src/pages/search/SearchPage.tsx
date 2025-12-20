"use client"

import { API_BASE } from "@/api/config";
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
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useRestaurantFilter } from "@/contexts/RestaurantFilterContext";
import { DiscoveryRestaurant } from "@/lib/type";
import { cn } from "@/lib/utils";
import { useEffect, useMemo, useState } from "react";

/* ------------------------------- Demo Types ------------------------------- */

const DietaryOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-free",
  "Halal",
  "Dairy-free",
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

  // Filter Options
  const [cuisineOptions, setCuisineOptions] = useState<string[]>([]);
  const [priceOptions, setPriceOptions] = useState<string[]>([]);
  const [dietaryOptions, setDietaryOptions] = useState<string[]>([]);

  // Sorting States
  const [popularSort, setPopularSort] = useState(false);
  const [ratingSort, setRatingSort] = useState(false);
  
  // Database req
  const [restaurants, setRestaurants] = useState<DiscoveryRestaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<DiscoveryRestaurant | null>(null);

  // pulls restaurants data from db
  useEffect(() => {
    fetch(`${API_BASE}/restaurants`)
      .then((r) => r.json())
      .then((data) => setRestaurants(data as DiscoveryRestaurant[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    // get all unique cuisines
    const uniqueCuisines: string[] = [];
    restaurants.forEach((r) => {
      r.cuisine.forEach((cuisine) => {
        if (!uniqueCuisines.includes(cuisine)) uniqueCuisines.push(cuisine);
      })
    });
    setCuisineOptions(uniqueCuisines);

    // get all unique prices
    const uniquePrices: string[] = [];
    restaurants.forEach((r) => {
      if (!uniquePrices.includes(r.priceLevel)) uniquePrices.push(r.priceLevel);
    });
    setPriceOptions(uniquePrices);
  }, [restaurants]);
  
  const closeDetails = () => setSelected(null);

  // takes the database query and filters + sorts it
  const searchResults = useMemo(() => {
    if (popularSort) {
      restaurants.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    if (ratingSort) {
      restaurants.sort((a, b) => b.rating - a.rating);
    }

    return restaurants.filter((r) => {
      const matchesSearch = !searchTerm.trim() || 
        r.name.toLowerCase().includes(searchTerm.trim().toLowerCase());
      
      const matchesCuisine = !cuisine || 
        r.cuisine.includes(cuisine);
      
      const matchesPrice = !price || 
        r.priceLevel.toLowerCase().includes(price);
      
      const matchesDietary = !dietary || 
        r.tags.includes(dietary);
      
      return matchesSearch && matchesCuisine && matchesPrice && matchesDietary;
    });
  }, [searchTerm, restaurants, cuisine, price, dietary, popularSort, ratingSort]);

  useEffect(() => {
    setFilteredRestaurantIds(searchResults.map(c => c._id));
  }, [searchTerm, setFilteredRestaurantIds]);
  
  const clearFilters = () => {
    setPrice("");
    setCuisine("");
    setDietary("");
  }

  const clearSorts = () => {
    setPopularSort(false);
    setRatingSort(false);
  }

  if (loading) {
    return (
      <div>
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <div className="flex flex-row p-4 gap-4">
      {/* Search + Filters */}
      <div className="flex flex-col h-full gap-4 w-[350px]">
        <Input
          className="rounded-3xl"
          value={searchTerm}
          placeholder="Search..."
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <Card className="h-full border-0 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle>
              Filters
            </CardTitle>
            <CardDescription>
              Select filters you want to apply to your search
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            {/* Cuisine */}
            <SearchFilterDropdown 
              label="Cuisine"
              value={cuisine}
              setValue={setCuisine}
              open={cuisineSelectOpen}
              setOpen={setCuisineSelectOpen}
              valOptions={cuisineOptions}
            />

            {/* Price */}
            <SearchFilterDropdown 
              label="Price"
              value={price}
              setValue={setPrice}
              open={priceSelectOpen}
              setOpen={setPriceSelectOpen}
              valOptions={priceOptions}
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
      </div>

      {/* Sort + Results */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-row gap-2">
          <Button variant="ghost" className="rounded-3xl">
            Sort by:
          </Button>
          <Button
            variant="secondary"
            className={cn("rounded-3xl", popularSort && "bg-gray-300")}
            onClick={() => {
              setPopularSort(!popularSort);
              setRatingSort(false);
            }}
          >
            Most Popular
          </Button>
          <Button
            variant="secondary"
            className={cn("rounded-3xl", ratingSort && "bg-gray-300")}
            onClick={() => {
              setRatingSort(!ratingSort);
              setPopularSort(false);
            }}
          >
            Highest Rated
          </Button>
          <Button className="rounded-3xl" onClick={clearSorts}>
            Clear
          </Button>
        </div>

        <ScrollArea>
          <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-2">
            { searchResults.length === 0 ? (
                <span>No restaurants found</span>
              ) : (
                searchResults.map((restaurant) => (
                  <Card className="rounded-3xl min-h-[300px]" key={restaurant._id}>
                    <CardHeader>
                      <CardTitle className="text-xl">
                        {restaurant.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>
                        <b>Cuisine: </b>{restaurant.cuisine}
                      </div>
                      <div>
                        <b>Rating: </b>{restaurant.rating}
                      </div>
                      <div>
                        <b>Price: </b>{restaurant.priceLevel}
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
          </div>
          <ScrollBar />
        </ScrollArea>

      </div>
    </div>
  );
}