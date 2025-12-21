"use client"

import { API_BASE } from "@/api/config";
import RestaurantDetailsSheet from "@/components/restaurant/RestaurantDetailsSheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Item, ItemActions, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "@/components/ui/item";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge as BadgeSchema, DiscoveryRestaurant, Review, UserProfile } from "@/lib/type";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";


/* -------------------------------- Demo User ------------------------------- */

const userBadges: BadgeSchema[] = [
  {
    _id: "badge-1",
    icon: "👨‍🍳",
    title: "MasterChef",
  },
  {
    _id: "badge-2",
    icon: "🍰",
    title: "Sweet Tooth",
  },
  {
    _id: "badge-3",
    icon: "🔥",
    title: "Top Reviewer",
  },
];

const userReviews: Review[] = [
  {
    _id: "review-1",
    restaurant: "Yallah Eats",
    user: "user-1",
    rating: 5,
    content: "Insane mezze platter. Portions are generous and staff are unreal.",
    date: new Date("2024-10-12"),
  },
  {
    _id: "review-2",
    restaurant: "Stellini Pasta Bar",
    user: "user-1",
    rating: 4,
    content: "Solid pasta, great vibe near campus. Would come back.",
    date: new Date("2024-11-03"),
  },
  {
    _id: "review-3",
    user: "user-1",
    restaurant: "Nene Chicken UNSW",
    rating: 4,
    content: "Perfect crispy chicken between classes.",
    date: new Date("2024-11-18"),
  },
];

const user: UserProfile = {
  _id: "user-1",
  username: "alice",
  firstName: "Alice",
  lastName: "Johnson",
  email: "user@example.com",
  profilePicture:
    "https://tb-static.uber.com/prod/image-proc/processed_images/106015e768d2aa3113a7c8991a9ef9fd/3ac2b39ad528f8c8c5dc77c59abb683d.jpeg",
  xp: 420,
  badges: userBadges,
};

export default function ProfilePage() {
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

  const getReviewRestaurant = (restaurantId: string) => {
    return restaurants.find((r) => r.name === restaurantId)!;
  }

  const closeDetails = () => setSelected(null);


  return (
    <div className="w-full flex flex-row p-4 gap-6">
      {/* Profile Card  + Badges*/}
      <div className="flex flex-col w-1/2 gap-6">
        <Card className="rounded-3xl shadow-lg flex flex-row">
          <CardHeader className="flex flex-row h-full ">
            <Avatar className="size-48 shadow-2xl">
              <AvatarImage src={user.profilePicture} className="object-cover"/>
              <AvatarFallback>User Profile</AvatarFallback>
            </Avatar>
          </CardHeader>
          <CardContent className="flex flex-col pt-8 h-full justify-center">
            <CardTitle className="flex flex-row pb-4 gap-4">
              {user.username}
              <Badge variant="secondary" className="bg-emerald-500 text-white text-sm">
                {user.xp} XP
              </Badge>
            </CardTitle>
            <div>
              <b>First Name: </b>{user.firstName}
            </div>
            <div>
              <b>Last Name: </b>{user.lastName}
            </div>
            <div>
              <b>Number of Badges: </b>{user.badges.length}
            </div>
          </CardContent>
        </Card>

        <Card className="border-none h-2/3 w-full shadow-none p-0">
          <CardHeader className="pl-4">
            <CardTitle>
              Badges
            </CardTitle>
          </CardHeader>
          <CardContent className=" pl-4 pr-0">
            <ScrollArea className="flex flex-col gap-2">
              {user.badges.map((badge) => (
                <Item key={badge._id} variant="outline" className="shadow-sm rounded-3xl mb-2">
                  <ItemMedia>
                    <div className="text-3xl">
                      {badge.icon}
                    </div>
                  </ItemMedia>
                  <ItemTitle className="text-lg">
                    {badge.title}
                  </ItemTitle>
                </Item>
              ))}
              <ScrollBar />
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Separator orientation="vertical"/>

      {/* Reviews */}
      <div className="flex flex-col w-1/2 gap-6 pr-6">
        <Card className="border-none h-full w-full shadow-none p-0">
          <CardHeader className="pl-4">
            <CardTitle>
              Reviews
            </CardTitle>
          </CardHeader>
          <CardContent className=" pl-4 pr-0">
            {loading ? (
              <span>Loading...</span>
            ) : (
              <ScrollArea className="flex flex-col gap-2">
                {userReviews.map((review) => (
                  <Item key={review._id} variant="outline" className="shadow-sm rounded-3xl mb-2">
                    <ItemContent>
                      <ItemTitle className="text-lg">
                        {review.restaurant}
                        <div className="flex items-center rounded-full bg-white px-2 py-1 text-sm font-semibold">
                          <Star className="mr-1 h-4 w-4 text-red-500" />
                          <span>{review.rating.toFixed(1)}</span>
                        </div>
                      </ItemTitle>
                      <ItemDescription>
                        {review.content}
                      </ItemDescription>
                    </ItemContent>
                    <ItemActions className="flex flex-col">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="rounded-3xl"
                        onClick={() => setSelected(getReviewRestaurant(review.restaurant))}
                      >
                        View
                      </Button>
                    </ItemActions>
                    <img
                      src={getReviewRestaurant(review.restaurant)?.imageUrl ?? ""}
                      alt="restaurant-photo"
                      className="h-32 w-full object-cover object-center rounded-xl mt-2"
                    />
                  </Item>
                ))}
                <ScrollBar />
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      </div>
      <RestaurantDetailsSheet
        restaurant={selected}
        open={!!selected}
        onOpenChange={(open) => {
          if (!open) closeDetails();
        }}
      />
    </div>
  );
}