import { Schema, model, Types } from "mongoose";

export interface IReview {
  restaurant: Types.ObjectId;
  user: Types.ObjectId;
  rating: number;
  content?: string;
  date: Date;
}

const ReviewSchema = new Schema<IReview>({
  restaurant: { type: Schema.Types.ObjectId, ref: "Restaurant", required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  content: { type: String, maxlength: 500 },
  date: { type: Date, default: () => new Date() },
}, { timestamps: true });

export const Review = model<IReview>("Review", ReviewSchema);