import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

export const ENV = {
  PORT: process.env.PORT || '5000',
  JWT_SECRET: process.env.JWT_SECRET || 'secret',
  MONGO_URI: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/access_schedule',
};

mongoose
  .connect(ENV.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(err => {
    console.error('MongoDB connection error:', err);
  });
