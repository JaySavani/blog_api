import config from '@/config';
import type { ConnectOptions } from 'mongoose';
import mongoose from 'mongoose';

const clientOptions: ConnectOptions = {
  dbName: 'blog-db',
  appName: 'Blog API',
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true,
  },
};

export const connectToDatabase = async (): Promise<void> => {
  if (!config.MONGODB_URI) {
    throw new Error('MONGODB_URI is not defined in environment variables');
  }
  try {
    await mongoose.connect(config.MONGODB_URI, clientOptions);
    console.log('Connected to MongoDB successfully', {
      uri: config.MONGODB_URI,
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.error('Error connecting to MongoDB:', error);
    throw error;
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB successfully', {
      uri: config.MONGODB_URI,
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }

    console.error('Error disconnecting from MongoDB:', error);
  }
};
