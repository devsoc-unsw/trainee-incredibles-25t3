import { Request, Response } from 'express';
import { Dish } from '../models/dish.model';
import { Review } from '../models/review.model';

export const getDish = async (req: Request, res: Response) => {
  const { id } = req.params;
  const dish = await Dish.findById(id).lean();
  if (!dish) return res.status(404).json({ message: 'Dish not found' });
  const reviews = await Review.find({ dish: dish._id }).sort({ createdAt: -1 }).lean();
  res.json({ ...dish, reviews });
};

export const addReview = async (req: Request, res: Response) => {
  const { id } = req.params; // dish id
  const { rating, text } = req.body;
  if (!rating || typeof rating !== 'number') {
    return res.status(400).json({ message: 'rating (number) is required' });
  }
  const review = await Review.create({ dish: id, rating, text });
  res.status(201).json(review);
};
