import { Request, Response } from 'express';
import { Restaurant } from '../models/restaurant.model';
import { Dish } from '../models/dish.model';

export const getRestaurants = async (req: Request, res: Response) => {
  const list = await Restaurant.find().lean();
  res.json(list);
};

export const getRestaurantDishes = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dishes = await Dish.find({ restaurant: id }).lean();
  res.json(dishes);
};
