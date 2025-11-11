import { Router } from 'express';
import { health } from '../controllers/health.controller';
import * as restaurantCtrl from '../controllers/restaurant.controller';
import * as dishCtrl from '../controllers/dish.controller';

const router = Router();

router.get('/health', health);

// Restaurants
router.get('/restaurants', restaurantCtrl.getRestaurants);
router.get('/restaurants/:id/dishes', restaurantCtrl.getRestaurantDishes);

// Dishes & reviews
router.get('/dishes/:id', dishCtrl.getDish);
router.post('/dishes/:id/reviews', dishCtrl.addReview);

export default router;
