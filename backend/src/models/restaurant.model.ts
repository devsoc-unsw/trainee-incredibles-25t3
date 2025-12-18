import mongoose, { Schema, Document } from "mongoose";
import { AddressSchema, IAddress } from "./address.model";

export interface IRestaurant extends Document {
  name: string;
  cuisine: string[];
  rating: number;
  reviewCount: number;
  priceLevel: string;
  imageUrl: string;
  address: IAddress;
  addressDisplay: string;
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

  address: { type: AddressSchema, required: true },

  addressDisplay: { type: String, required: true },

  phone: { type: String, required: true },
  hours: { type: String, required: true },
  tags: { type: [String], default: [] },
});

export const Restaurant = mongoose.model<IRestaurant>(
  "Restaurant",
  RestaurantSchema
);
