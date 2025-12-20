"use client"

import { SearchFilterDropdown } from "@/components/SearchFilterDropdown";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useState } from "react";

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

/* ---------------------------- Main Search Page ---------------------------- */
export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter States + Values
  const [cuisine, setCuisine] = useState("");
  const [cuisineSelectOpen, setCuisineSelectOpen] = useState(false);
  const [price, setPrice] = useState("");
  const [priceSelectOpen, setPriceSelectOpen] = useState(false);
  const [dietary, setDietary] = useState("");
  const [dietarySelectOpen, setDietarySelectOpen] = useState(false);

  return (
    <div className="flex flex-col">
      {/* Search + Sort */}
      <div className="flex flex-row">
        <Input placeholder="Search..." onChange={(e) => setSearchTerm(e.target.value)}/>
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
            {/* Clear button, Apply Filters button (don't really need it, we can use the SearchContext to make it responsive) */}
          </CardFooter>
        </Card>

        <div>
          {/* RESULTS */}
        </div>

      </div>
    </div>
  )
}