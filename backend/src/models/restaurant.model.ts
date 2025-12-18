// backend/src/models/restaurant.model.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IRestaurant extends Document {
  name: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  priceLevel: string;
  imageUrl: string;
  address: string;
  phone: string;
  hours: string;
  tags: string[];
}

const RestaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  cuisine: { type: [String], required: true },
  rating: { type: Number, required: true },
  reviewCount: { type: Number, required: true },
  priceLevel: { type: String, required: true },
  imageUrl: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  hours: { type: String, required: true },
  tags: { type: [String], default: [] },
});

export const Restaurant = mongoose.model<IRestaurant>(
  "Restaurant",
  RestaurantSchema
);
