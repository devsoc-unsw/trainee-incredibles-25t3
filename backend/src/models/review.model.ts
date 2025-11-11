import mongoose, { Schema, Document, Types } from 'mongoose';

export interface IReview extends Document {
  dish: Types.ObjectId;
  rating: number;
  text?: string;
  createdAt: Date;
}

const ReviewSchema = new Schema<IReview>({
  dish: { type: Schema.Types.ObjectId, ref: 'Dish', required: true },
  rating: { type: Number, required: true },
  text: { type: String },
  createdAt: { type: Date, default: () => new Date() }
});

export const Review = mongoose.model<IReview>('Review', ReviewSchema);
