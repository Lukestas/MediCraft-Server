import mongoose from 'mongoose';
import { MONGODB_API } from './env.js';

class MongoDB {
  private static instance: MongoDB;
  private isConnected: boolean = false;

  private constructor() {}

  public static getInstance(): MongoDB {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }
    return MongoDB.instance;
  }

  public async connect(): Promise<void> {
    if (this.isConnected) {
      console.log('MongoDB already connected');
      return;
    }
    try {
      await mongoose.connect(MONGODB_API);
      this.isConnected = true;
      console.log('Database connected');
    } catch (error) {
      console.log(`Error connecting database: -> ${error}`);
      process.exit(1);
    }
  }
}

export const startDBConnection = async () => {
  const db = MongoDB.getInstance();
  await db.connect();
};
