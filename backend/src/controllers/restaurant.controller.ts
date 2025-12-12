// src/controllers/restaurant.controller.ts
import { Request, Response } from 'express';
import { Restaurant } from '../models/restaurant.model';
import { Dish } from '../models/dish.model';

export const getRestaurants = async (req: Request, res: Response) => {
  try {
    const list = await Restaurant.find()
      .select('name cuisine rating imageUrl tags')
      .lean();

    res.json(list);
  } catch (err) {
    console.error('Error fetching restaurants', err);
    res.status(500).json({ message: 'Failed to fetch restaurants' });
  }
};

export const getRestaurantDishes = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const dishes = await Dish.find({ restaurant: id }).lean();
    res.json(dishes);
  } catch (err) {
    console.error('Error fetching dishes', err);
    res.status(500).json({ message: 'Failed to fetch dishes' });
  }
};
