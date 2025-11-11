import { connectToMongo } from './lib/mongoose';
import { Restaurant } from './models/restaurant.model';
import { Dish } from './models/dish.model';
import { Review } from './models/review.model';

async function seed() {
  await connectToMongo();
  console.log('Clearing existing demo data...');
  await Review.deleteMany({});
  await Dish.deleteMany({});
  await Restaurant.deleteMany({});

  console.log('Creating restaurants and dishes...');
  const r1 = await Restaurant.create({ name: 'Yallah (UNSW)', location: 'Kensington' });
  const r2 = await Restaurant.create({ name: 'The Square Cafe', location: 'Tower' });

  const d1 = await Dish.create({ name: 'HSP', restaurant: r1._id, description: 'Halal snack pack at Yallah' });
  const d2 = await Dish.create({ name: 'Flat White', restaurant: r2._id, description: 'Strong coffee' });

  await Review.create({ dish: d1._id, rating: 6, text: 'Decent but could use more sauce' });
  await Review.create({ dish: d1._id, rating: 8, text: 'Great value' });
  await Review.create({ dish: d2._id, rating: 9, text: 'Perfect crema' });

  console.log('Seed complete.');
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
