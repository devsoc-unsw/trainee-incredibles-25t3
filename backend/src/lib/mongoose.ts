import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

export async function connectToMongo() {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI not set in environment');
  }

  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Failed to connect to MongoDB', (err as Error).message || err);
    throw err;
  }
}

export default mongoose;
