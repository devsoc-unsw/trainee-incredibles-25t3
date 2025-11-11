"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("./lib/mongoose");
const restaurant_model_1 = require("./models/restaurant.model");
const dish_model_1 = require("./models/dish.model");
const review_model_1 = require("./models/review.model");
async function seed() {
    await (0, mongoose_1.connectToMongo)();
    console.log('Clearing existing demo data...');
    await review_model_1.Review.deleteMany({});
    await dish_model_1.Dish.deleteMany({});
    await restaurant_model_1.Restaurant.deleteMany({});
    console.log('Creating restaurants and dishes...');
    const r1 = await restaurant_model_1.Restaurant.create({ name: 'Yallah (UNSW)', location: 'Kensington' });
    const r2 = await restaurant_model_1.Restaurant.create({ name: 'The Square Cafe', location: 'Tower' });
    const d1 = await dish_model_1.Dish.create({ name: 'HSP', restaurant: r1._id, description: 'Halal snack pack at Yallah' });
    const d2 = await dish_model_1.Dish.create({ name: 'Flat White', restaurant: r2._id, description: 'Strong coffee' });
    await review_model_1.Review.create({ dish: d1._id, rating: 6, text: 'Decent but could use more sauce' });
    await review_model_1.Review.create({ dish: d1._id, rating: 8, text: 'Great value' });
    await review_model_1.Review.create({ dish: d2._id, rating: 9, text: 'Perfect crema' });
    console.log('Seed complete.');
    process.exit(0);
}
seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
