"use client"

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge as BadgeSchema, Review, UserProfile } from "@/lib/type";

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
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/960px-Default_pfp.svg.png",
  xp: 420,
  badges: userBadges,
};

export default function ProfilePage() {
  return (
    <div className="w-full flex flex-row p-4 gap-4">
      {/* Profile Card  + Badges*/}
      <div className="flex flex-col w-1/2">
        <Card className="rounded-3xl shadow-xl flex flex-row">
          <CardHeader className="flex flex-row">
            <img alt="profile-picture" src={user.profilePicture} className="w-48 h-48" />
          </CardHeader>
          <CardContent className="flex flex-col pt-8">
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

        <div>

        </div>
      </div>

      {/* Restaurants + Reviews */}
      <div>
        <div>

        </div>
        <div>

        </div>
      </div>
    </div>
  );
}