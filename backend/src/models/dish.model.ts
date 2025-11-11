import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IDish extends Document {
  name: string;
  restaurant: Types.ObjectId;
  description?: string;
}

const DishSchema = new Schema<IDish>({
  name: { type: String, required: true },
  restaurant: { type: Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  description: { type: String }
});

export const Dish = mongoose.model<IDish>('Dish', DishSchema);
