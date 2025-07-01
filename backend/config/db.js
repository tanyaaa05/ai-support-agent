import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

/**
 * Connects to MongoDB using the URI from environment variables.
 * Exits process on failure.
 */
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};

export default connectDB;
