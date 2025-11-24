import { Schema, model } from "mongoose";
import { AddressSchema, IAddress } from "./address.model";

export interface IRestaurant {
  name: string;
  address: IAddress;
  menuLink?: string;
  phoneNumber?: string;
  website?: string;
  logoFileName?: string;
}

const RestaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  menuLink: { type: String },
  phoneNumber: { type: String },
  website: { type: String },
  logoFileName: { type: String },
}, { timestamps: true });

export const Restaurant = model<IRestaurant>("Restaurant", RestaurantSchema);