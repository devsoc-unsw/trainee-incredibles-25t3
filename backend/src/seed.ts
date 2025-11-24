import mongoose from "mongoose";
import { User } from "./models/user.model";
import { Restaurant } from "./models/restaurant.model";
import { Review } from "./models/review.model";

async function seed() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/yourdbname");

    console.log("Connected to database.");

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Restaurant.deleteMany({}),
      Review.deleteMany({}),
    ]);

    console.log("Cleared existing collections.");

    // Create Users
    const users = await User.insertMany([
      {
        username: "alice",
        firstName: "Alice",
        lastName: "Johnson",
        email: "alice@example.com",
        password: "hashed-password-1",
        xp: 0,
        badges: [],
      },
      {
        username: "bob",
        firstName: "Bob",
        lastName: "Smith",
        email: "bob@example.com",
        password: "hashed-password-2",
        xp: 0,
        badges: [],
      },
    ]);

    console.log("Users seeded.");

    // Create Restaurants
    const restaurants = await Restaurant.insertMany([
      {
        name: "Sushi House",
        address: {
          country: "USA",
          suburb: "Brooklyn",
          postcode: "11201",
          streetname: "Main St",
          addressLine1: "100 Main St",
        },
        menuLink: "",
        phoneNumber: "123-456-7890",
        website: "",
        logoFileName: "",
      },
      {
        name: "Pasta Palace",
        address: {
          country: "USA",
          suburb: "Queens",
          postcode: "11368",
          streetname: "Broadway Ave",
          addressLine1: "22 Broadway Ave",
        },
        menuLink: "",
        phoneNumber: "555-123-4567",
        website: "",
        logoFileName: "",
      },
    ]);

    console.log("Restaurants seeded.");

    // Create Reviews
    await Review.insertMany([
      {
        restaurant: restaurants[0]._id,
        user: users[0]._id,
        rating: 5,
        content: "Amazing place. Great sushi.",
        date: new Date(),
      },
      {
        restaurant: restaurants[1]._id,
        user: users[1]._id,
        rating: 4,
        content: "Solid pasta. Will return.",
        date: new Date(),
      },
    ]);

    console.log("Reviews seeded.");

    console.log("Database seed complete.");
    process.exit(0);
  } catch (err) {
    console.error("Seed failed:", err);
    process.exit(1);
  }
}

seed();