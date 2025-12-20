"use client"

import { DiscoveryRestaurant } from "@/lib/type";
import {
  Sheet,    
  SheetContent,
  SheetHeader,
  SheetTitle
} from "@/components/ui/sheet";
import {
  Star,
  MapPin,
  Phone,
  Clock
} from "lucide-react";
import { Button } from "@/components/ui/button";

type RestaurantDetailsSheetProps = {
  restaurant: DiscoveryRestaurant | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function RestaurantDetailsSheet({
  restaurant,
  open,
  onOpenChange,
} : RestaurantDetailsSheetProps) {
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
