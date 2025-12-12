import { connectToMongo } from './lib/mongoose';
import { Restaurant } from './models/restaurant.model';

async function seed() {
  await connectToMongo();
  console.log('Clearing existing demo data...');
  await Restaurant.deleteMany({});

  await Restaurant.insertMany([
  {
    name: "Yallah Eats",
    cuisine: ["Middle Eastern"],     // 👈 array now
    rating: 4.5,
    imageUrl: "https://images.pexels.com/photos/6287547/pexels-photo-6287547.jpeg",
    tags: ["trending"],
  },
  {
    name: "Stellini Cafe",
    cuisine: ["Italian"],
    rating: 4.8,
    imageUrl: "https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg",
    tags: ["trending", "coffee-hit"],
  },
  {
    name: "Stuck Market",
    cuisine: ["Street Food"],
    rating: 4.2,
    imageUrl: "https://images.pexels.com/photos/3738755/pexels-photo-3738755.jpeg",
    tags: ["trending", "hot-deal"],
  },
  {
    name: "Sunny Brunch Club",
    cuisine: ["Brunch"],
    rating: 4.7,
    imageUrl: "https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg",
    tags: ["hot-deal"],
  },
  {
    name: "Loft & Latte",
    cuisine: ["Cafe"],
    rating: 4.6,
    imageUrl: "https://images.pexels.com/photos/374885/pexels-photo-374885.jpeg",
    tags: ["hot-deal", "coffee-hit"],
  },
  {
    name: "Candlelight Bistro",
    cuisine: ["Modern European"],
    rating: 4.9,
    imageUrl: "https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg",
    tags: ["new"],
  },
  {
    name: "Riverside Dine",
    cuisine: ["Fusion"],
    rating: 4.3,
    imageUrl: "https://images.pexels.com/photos/6267/menu-restaurant-dining-table.jpg",
    tags: ["new"],
  },
  {
    name: "Midnight Espresso",
    cuisine: ["Coffee"],
    rating: 4.4,
    imageUrl: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg",
    tags: ["coffee-hit"],
  },
]);

  console.log('Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
