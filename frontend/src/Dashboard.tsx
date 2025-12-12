import React, { useEffect, useState } from "react";
import { API_BASE } from "./api/config";
import type {  DiscoveryRestaurant } from "./lib/type";
import Sidebar from "./sidebar";


type Section = {
  title: string;
  key: string;
  filter: (r: DiscoveryRestaurant) => boolean;
};

const sections: Section[] = [
  { title: "Trending Now", key: "trending", filter: (r) => r.tags?.includes("trending") ?? false },
  { title: "Hot Deals", key: "hot-deals", filter: (r) => r.tags?.includes("hot-deal") ?? false },
  { title: "New Arrivals", key: "new-arrivals", filter: (r) => r.tags?.includes("new") ?? false },
  { title: "Coffee Hits", key: "coffee-hits", filter: (r) => r.tags?.includes("coffee-hit") ?? false },
];

const Dashboard: React.FC = () => {
  const [restaurants, setRestaurants] = useState<DiscoveryRestaurant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE}/restaurants`)
      .then((r) => r.json())
      .then((data) => setRestaurants(data as DiscoveryRestaurant[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />

      <main className="flex-1 overflow-y-auto bg-background">
        <div className="px-8 py-6">
          <h1 className="mb-8 text-4xl font-bold tracking-tight">Discover</h1>

          {loading ? (
            <p className="text-muted-foreground">Loading…</p>
          ) : (
            <div className="space-y-10">
              {sections.map((section) => {
                const items = restaurants.filter(section.filter);
                if (!items.length) return null;

                return (
                  <section key={section.key} className="space-y-4">
                    <h2 className="text-2xl font-semibold">{section.title}</h2>

                    <div className="grid gap-6 md:grid-cols-3">
                      {items.map((r) => (
                        <RestaurantCard key={r._id as string} restaurant={r} />
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

type RestaurantCardProps = {
  restaurant: DiscoveryRestaurant;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant }) => {
  const { name, cuisine, rating, imageUrl } = restaurant;

  return (
    <div className="relative h-56 overflow-hidden rounded-3xl shadow-md">
      <div
        className="h-full w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${imageUrl ?? ""})` }}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {rating != null && (
        <div className="absolute left-4 top-4 flex items-center rounded-full bg-white px-2 py-1 text-xs font-semibold">
          <span className="mr-1 text-red-500">★</span>
          <span>{rating.toFixed(1)}</span>
        </div>
      )}

      <div className="absolute bottom-4 left-4 right-4 text-white">
        <h3 className="text-lg font-semibold">{name}</h3>
        {cuisine?.length > 0 && (
          <p className="text-sm text-white/80">{cuisine.join(", ")}</p>
        )}
      </div>
    </div>
  );
};


export default Dashboard;
