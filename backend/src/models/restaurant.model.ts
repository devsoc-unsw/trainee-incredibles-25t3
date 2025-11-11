import mongoose, { Schema, Document } from 'mongoose';

export interface IRestaurant extends Document {
  name: string;
  location?: string;
}

const RestaurantSchema = new Schema<IRestaurant>({
  name: { type: String, required: true },
  location: { type: String }
});

export const Restaurant = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
