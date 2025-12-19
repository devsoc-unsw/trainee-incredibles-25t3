// src/lib/mongoose.ts
import 'dotenv/config';
import mongoose from 'mongoose';

export async function connectToMongo() {
  const uri = process.env.MONGO_URI;

  // TEMP debug – remove once it works
  console.log('MONGO_URI in connectToMongo =', uri);

  if (!uri) {
    throw new Error('MONGO_URI not set in environment');
  }

  await mongoose.connect(uri, { dbName: 'incredibles' });  // <— add dbName
  console.log('Connected to MongoDB');

}

export default mongoose;
