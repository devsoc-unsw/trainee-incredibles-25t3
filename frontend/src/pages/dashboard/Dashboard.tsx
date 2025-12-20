"use client"

import React, { useEffect, useState } from "react";
import { API_BASE } from "@/api/config";
import type {  DiscoveryRestaurant } from "@/lib/type";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { MapPin, Phone, Clock, Star, X } from "lucide-react";
import RestaurantCard from "@/components/restaurant/RestaurantCard";
import RestaurantDetailsSheet from "@/components/restaurant/RestaurantDetailsSheet";



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

export default Dashboard;
