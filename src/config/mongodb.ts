import mongoose from 'mongoose';
import { MONGODB_API } from './env.js';

export const MongoDBConnection = async () => {
  try {
    await mongoose.connect(MONGODB_API);
    console.log('Data base connected');
  } catch (error) {
    console.log(`Error connecting data base: -> ${error}`);
    process.exit(1);
  }
};
