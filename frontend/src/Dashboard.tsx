import React, { useEffect, useState } from "react";
import { API_BASE } from "./api/config";
import type {  DiscoveryRestaurant } from "./lib/type";
import Sidebar from "./Sidebar";
import { Button } from "./components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./components/ui/sheet";
import { MapPin, Phone, Clock, Star, X } from "lucide-react";



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
  const [selected, setSelected] = useState<DiscoveryRestaurant | null>(null);


  useEffect(() => {
    fetch(`${API_BASE}/restaurants`)
      .then((r) => r.json())
      .then((data) => setRestaurants(data as DiscoveryRestaurant[]))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const closeDetails = () => setSelected(null);

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
                        <RestaurantCard key={r._id as string} restaurant={r} onClick={() => setSelected(r)}/>
                      ))}
                    </div>
                  </section>
                );
              })}
            </div>
          )}
        </div>
      </main>
        <RestaurantDetailsSheet
          restaurant={selected}
          open={!!selected}
          onOpenChange={(open) => {
            if (!open) closeDetails();
          }}
        />
     </div>
  );
};

type RestaurantCardProps = {
  restaurant: DiscoveryRestaurant;
  onClick: (restaurant: DiscoveryRestaurant) => void;
};

const RestaurantCard: React.FC<RestaurantCardProps> = ({ restaurant, onClick }) => {
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

type RestaurantDetailsSheetProps = {
  restaurant: DiscoveryRestaurant | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const RestaurantDetailsSheet: React.FC<RestaurantDetailsSheetProps> = ({
  restaurant,
  open,
  onOpenChange,
}) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="w-full max-w-md sm:max-w-lg overflow-y-auto p-0"
      >
        {restaurant && (
          <>
            <SheetHeader className="flex flex-row items-center justify-between px-6 py-4 border-b">
              <SheetTitle>Restaurant Details</SheetTitle>
            </SheetHeader>

            <div className="space-y-6 px-6 pb-8 pt-4">
              <div className="overflow-hidden rounded-3xl">
                <div
                  className="h-52 w-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${restaurant.imageUrl ?? ""})` }}
                />
              </div>

              <div>
                <h2 className="text-2xl font-bold">{restaurant.name}</h2>
                {restaurant.cuisine?.length > 0 && (
                  <p className="text-sm text-muted-foreground">
                    Authentic {restaurant.cuisine.join(", ")} cuisine
                  </p>
                )}
              </div>

              <div className="flex flex-row items-center gap-3">
                {restaurant.rating != null && (
                  <div className="flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1 text-xs font-medium text-rose-600">
                    <Star className="h-3 w-3 fill-rose-500 text-rose-500" />
                    <span>{restaurant.rating.toFixed(1)}</span>
                    <span className="text-rose-400">
                      ({restaurant.reviewCount} reviews)
                    </span>
                  </div>
                )}
                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {restaurant.priceLevel}
                </div>
              </div>

              <hr className="border-border" />
              <div className="space-y-4 text-sm">
                <div>
                  <p className="mb-1 font-semibold">Address</p>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <MapPin className="mt-0.5 h-4 w-4" />
                    <span>{restaurant.addressDisplay}</span>
                  </div>
                </div>

                <div>
                  <p className="mb-1 font-semibold">Phone</p>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <Phone className="mt-0.5 h-4 w-4" />
                    <span>{restaurant.phone}</span>
                  </div>
                </div>

                <div>
                  <p className="mb-1 font-semibold">Hours</p>
                  <div className="flex items-start gap-2 text-muted-foreground">
                    <Clock className="mt-0.5 h-4 w-4" />
                    <span>{restaurant.hours}</span>
                  </div>
                </div>
              </div>

              <hr className="border-border" />

              {restaurant.cuisine?.length > 0 && (
                <div className="space-y-2">
                  <p className="font-semibold">Cuisines</p>
                  <div className="flex flex-wrap gap-2">
                    {restaurant.cuisine.map((c) => (
                      <span
                        key={c}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-2">
                <Button className="w-full rounded-full text-base font-semibold">
                  Order now
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};


export default Dashboard;
