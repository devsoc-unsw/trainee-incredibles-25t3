"use client"

import { DiscoveryRestaurant } from "@/lib/type";
import { Star } from "lucide-react";

type RestaurantCardProps = {
  restaurant: DiscoveryRestaurant;
  onClick: (restaurant: DiscoveryRestaurant) => void;
};

export default function RestaurantCard({ restaurant, onClick } : RestaurantCardProps) {
  const { name, cuisine, rating, imageUrl } = restaurant;

  return (
    <button
      type="button"
      onClick={() => onClick(restaurant)}
      className="relative h-56 overflow-hidden rounded-3xl shadow-md text-left focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
    >
      <div
        className="h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl ?? ""})` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {rating != null && (
        <div className="absolute left-4 top-4 flex items-center rounded-full bg-white px-2 py-1 text-xs font-semibold">
          <Star className="mr-1 h-3 w-3 text-red-500" />
          <span>{rating.toFixed(1)}</span>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h3 className="text-lg font-semibold">{name}</h3>
        {cuisine?.length > 0 && (
          <p className="text-sm text-white/80">{cuisine.join(", ")}</p>
        )}
      </div>
    </button>
  );
};