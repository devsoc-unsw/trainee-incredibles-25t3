import mongoose, { Schema, Document } from 'mongoose';

export interface IReview {
  dishId: string;
  rating: number;
  review: string;
  createdAt: Date;
}

export interface IUser extends Document {
  username: string;
  email: string;
  xp: number;
  badges: string[];
  reviews: IReview[];
}

const ReviewSchema = new Schema<IReview>({
  dishId: { type: String, required: true },
  rating: { type: Number, required: true },
  review: { type: String, required: false },
  createdAt: { type: Date, default: () => new Date() }
});

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  xp: { type: Number, default: 0 },
  badges: { type: [String], default: [] },
  reviews: { type: [ReviewSchema], default: [] }
});

export const User = mongoose.model<IUser>('User', UserSchema);
