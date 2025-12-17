import { Schema, model } from "mongoose";

export interface IBadge {
  icon: string;
  title: string;
}

const BadgeSchema = new Schema<IBadge>({
  icon: { type: String, required: true },
  title: { type: String, required: true },
});

export interface IUser {
  username: string;
  profilePicture?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  xp: number;
  badges: IBadge[];
}

const UserSchema = new Schema<IUser>({
  username: { type: String, required: true },
  profilePicture: { type: String },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  xp: { type: Number, default: 0 },
  badges: { type: [BadgeSchema], default: [] },
}, { timestamps: true });

export const User = model<IUser>("User", UserSchema);