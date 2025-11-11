"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantDishes = exports.getRestaurants = void 0;
const restaurant_model_1 = require("../models/restaurant.model");
const dish_model_1 = require("../models/dish.model");
const getRestaurants = async (req, res) => {
    const list = await restaurant_model_1.Restaurant.find().lean();
    res.json(list);
};
exports.getRestaurants = getRestaurants;
const getRestaurantDishes = async (req, res) => {
    const { id } = req.params;
    const dishes = await dish_model_1.Dish.find({ restaurant: id }).lean();
    res.json(dishes);
};
exports.getRestaurantDishes = getRestaurantDishes;
