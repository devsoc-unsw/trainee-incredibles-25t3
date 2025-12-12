import mongoose, { Schema, Document } from "mongoose";

export interface IRestaurant extends Document {
  name: string;
  cuisine: string[]; 
  rating: number;
  imageUrl: string;
  tags: string[];
}

const RestaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  cuisine: { type: [String], required: true },
  rating: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  tags: { type: [String], default: [] },
});

export const Restaurant = mongoose.model<IRestaurant>(
  "Restaurant",
  RestaurantSchema
);
