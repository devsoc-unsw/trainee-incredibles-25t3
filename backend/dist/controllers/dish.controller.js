"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addReview = exports.getDish = void 0;
const dish_model_1 = require("../models/dish.model");
const review_model_1 = require("../models/review.model");
const getDish = async (req, res) => {
    const { id } = req.params;
    const dish = await dish_model_1.Dish.findById(id).lean();
    if (!dish)
        return res.status(404).json({ message: 'Dish not found' });
    const reviews = await review_model_1.Review.find({ dish: dish._id }).sort({ createdAt: -1 }).lean();
    res.json({ ...dish, reviews });
};
exports.getDish = getDish;
const addReview = async (req, res) => {
    const { id } = req.params; // dish id
    const { rating, text } = req.body;
    if (!rating || typeof rating !== 'number') {
        return res.status(400).json({ message: 'rating (number) is required' });
    }
    const review = await review_model_1.Review.create({ dish: id, rating, text });
    res.status(201).json(review);
};
exports.addReview = addReview;
