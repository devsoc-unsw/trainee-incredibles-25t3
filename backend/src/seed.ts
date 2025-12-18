// backend/src/seed.ts
import { connectToMongo } from "./lib/mongoose";
import { Restaurant } from "./models/restaurant.model";
import { User } from "./models/user.model";
import { Review } from "./models/review.model";

async function seed() {
  await connectToMongo();
  console.log("Connected to MongoDB. Clearing existing demo data...");

  await Promise.all([
    User.deleteMany({}),
    Restaurant.deleteMany({}),
    Review.deleteMany({}),
  ]);

  console.log("Collections cleared.");

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

  const AU = "Australia";

  const restaurants = await Restaurant.insertMany([
    {
      name: "Yallah Eats",
      address: {
        country: AU,
        suburb: "Kensington",
        postcode: "2052",
        streetname: "High St",
        addressLine1: "17 High Street Gate 2, UNSW Sydney",
      },
      menuLink: "",
      website: "",
      cuisine: ["Middle Eastern"],
      rating: 4.6,
      reviewCount: 520,
      priceLevel: "$",
      imageUrl:
        "https://lh3.googleusercontent.com/p/AF1QipPfRxXmwJLzuJIUCJoBgTH23g_aGAkDZg2JyJ5E=s1360-w1360-h1020-rw",
      addressDisplay:
        "UNSW Sydney 17 High Street Gate 2 University of New South Wales",
      phone: "(02) 9662 0000",
      hours: "9.00 am–9.00 pm",
      tags: ["trending", "hot-deal"],
    },
    {
      name: "Stellini Pasta Bar",
      address: {
        country: AU,
        suburb: "Kensington",
        postcode: "2033",
        streetname: "High St",
        addressLine1: "Gate 2, 11 High St",
      },
      menuLink: "",
      website: "",
      cuisine: ["Italian"],
      rating: 4.3,
      reviewCount: 280,
      priceLevel: "$",
      imageUrl:
        "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSznNeZ1bgxJKkEtFVMJ_6BPuS7a48hv9F2nDW0QSqAJzEznKJ7bSkzk0Om6C52Omy7qUuEfxeaQY-JcqTWmoMOqMJNbQ-a7zPPVxeQeV2HSYds0BW4VLq7MtFyjdocgj6ECSM3H5A=s1360-w1360-h1020-rw",
      addressDisplay: "Gate 2, 11 High St, Kensington NSW 2033",
      phone: "+61 2 9663 0541",
      hours: "8.30 am–8.30 pm",
      tags: ["trending", "coffee-hit"],
    },
    {
      name: "Alleyway Kitchen",
      address: {
        country: AU,
        suburb: "Kensington",
        postcode: "2052",
        streetname: "College Rd",
        addressLine1: "Quad Food Court, Quadrangle Building",
      },
      menuLink: "",
      website: "",
      cuisine: ["Chinese"],
      rating: 4.1,
      reviewCount: 21,
      priceLevel: "$",
      imageUrl:
        "https://lh3.googleusercontent.com/p/AF1QipMV4j7XaLVkuYB6vOC2Cs-gCTwoIF0mI9OMFqw8=s1360-w1360-h1020-rw",
      addressDisplay: "Quad Food Court, Quadrangle Building, UNSW",
      phone: "+61 437 519 245",
      hours: "10.00 am–7.00 pm",
      tags: ["trending"],
    },
    {
      name: "Nene Chicken UNSW",
      address: {
        country: AU,
        suburb: "Kensington",
        postcode: "2033",
        streetname: "High St",
        addressLine1:
          "E15 Tenancy 1 Lower Ground, Quadrangle Building, Food Court Campus",
      },
      menuLink: "",
      phoneNumber: "+61 2 9662 2548",
      cuisine: ["Korean"],
      rating: 3.9,
      reviewCount: 107,
      priceLevel: "$",
      imageUrl:
        "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSxHw4jwtco8KqoTgDH-dKVffHXP51uKq9R_kpqT-kbg36_05az2XvKFW7bmgEjdJ-je9IIe8Urpym6SvQGzhEsRObaP7TC4K7T0gGETsgjnjM_fCeA07aTSvo20bgrh5BLa3GKf1k3KOAzK=s1360-w1360-h1020-rw",
      addressDisplay:
        "Food Court Campus, E15 Tenancy 1 Lower Ground, Quadrangle Building, High St, Kensington NSW 2033",
      phone: "+61 2 9662 2548",
      hours: "10.00 am–7.00 pm",
      tags: ["trending"],
    },
    {
      name: "PappaRich UNSW",
      address: {
        country: AU,
        suburb: "Kensington",
        postcode: "2052",
        streetname: "College Rd",
        addressLine1: "Quadrangle Building",
      },
      menuLink: "",
      website: "",
      cuisine: ["Malaysian"],
      rating: 4.0,
      reviewCount: 159,
      priceLevel: "$",
      imageUrl:
        "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyMEoiOokfUXbaQThOnej9YUGLk7kH_UqqUJ8yjrlzt1d2QAjnEnCU_yI8GF3OY3zbrLrzd7fWoggntDbDgknLnQYulxxP1tk9_zDSIKrLHv8Wh-qXA6ruk9XOVJqnfKzrVpzyp=s1360-w1360-h1020-rw",
      addressDisplay: "Quadrangle Building, College Rd, Kensington NSW 2052",
      phone: "+61 2 9662 2548",
      hours: "10.00 am–7.00 pm",
      tags: ["hot-deal"],
    },
    {
      name: "El Jannah Randwick",
      address: {
        country: AU,
        suburb: "Randwick",
        postcode: "2031",
        streetname: "Belmore Rd",
        addressLine1: "141 Belmore Rd",
      },
      menuLink: "",
      website: "",
      cuisine: ["Middle Eastern"],
      rating: 4.4,
      reviewCount: 515,
      priceLevel: "$",
      imageUrl:
        "https://lh3.googleusercontent.com/p/AF1QipOIAe56E7aqU4Pec59fRR5emKlu7jxznr4vE7nd=s1360-w1360-h1020-rw",
      addressDisplay: "141 Belmore Rd, Randwick NSW 2031, Australia",
      phone: "+61 2 7908 5476",
      hours: "11.00 am–11.00 pm",
      tags: ["trending"],
    },
    {
      name: "McDonald's Kingsford",
      address: {
        country: AU,
        suburb: "Kingsford",
        postcode: "2032",
        streetname: "Barker St",
        addressLine1: "10 Barker St",
      },
      menuLink: "",
      website: "",
      cuisine: ["Fast Food"],
      rating: 3.3,
      reviewCount: 4018,
      priceLevel: "$",
      imageUrl:
        "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwLbrEGm_pn--ESl9wz5XlCCxq_k8qdtmzj0DNg1eYFHvR7YB1AjMK6KycZ8s8s8YDgTpdc5G6dWBFr7E9uPOONkwfEEQszIP8mrva_blHb9bP6CY18k7CgKg2wptoCY0d6jgKw=s1360-w1360-h1020-rw",
      addressDisplay: "10 Barker St, Kingsford NSW 2032, Australia",
      phone: "+61 2 9662 1492",
      hours: "24 hours",
      tags: ["hot-deal"],
    },
    {
      name: "Coffee On Campus",
      address: {
        country: AU,
        suburb: "Kensington",
        postcode: "2033",
        streetname: "Engineering Rd",
        addressLine1: "Ainsworth Building (J17)",
      },
      menuLink: "",
      website: "",
      cuisine: ["Cafe"],
      rating: 3.5,
      reviewCount: 171,
      priceLevel: "$",
      imageUrl:
        "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSwqQI4EhiO0nS55oAGoRgY5Li4FGAEzNIinzySH9y5hs5C_7bNCUkYBFQr2CTayIBasyBAjOfuVNO-gObv3n7xFMKfEDTmEWgisfr8A6ceFiRgGZwvIOVRfJlvlUDY9KdCaCH28MA=s1360-w1360-h1020-rw",
      addressDisplay:
        "Ainsworth Building (J17), Engineering Rd, Kensington NSW 2033",
      phone: "+61 2 9697 0099",
      hours: "6.00 am–2.30 pm",
      tags: ["new", "coffee-hit"],
    },
  ]);

  console.log("Restaurants seeded.");

  await Review.insertMany([
    {
      restaurant: restaurants[0]._id,
      user: users[0]._id,
      rating: 5,
      content: "Insane mezze and super friendly staff.",
      date: new Date(),
    },
    {
      restaurant: restaurants[1]._id,
      user: users[1]._id,
      rating: 4,
      content: "Good pasta, nice vibe near campus.",
      date: new Date(),
    },
    {
      restaurant: restaurants[3]._id,
      user: users[0]._id,
      rating: 4,
      content: "Crispy chicken, perfect between classes.",
      date: new Date(),
    },
  ]);

  console.log("Reviews seeded.");
  console.log("Database seed complete.");
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
