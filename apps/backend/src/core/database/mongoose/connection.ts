
import appConfig from "#shared/config/app.config";
import mongoose from "mongoose";


export const connectDB = async (): Promise<void> => {
  try {
    console.log('ðŸ”„ Attempting to connect to MongoDB...');
    await mongoose.connect(appConfig.db_url as string, {
      maxPoolSize: 10, // Limit connection pool to prevent "max connections" errors on free tier
      serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds for Atlas resume
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferCommands: false, // Disable mongoose buffering
    });
    console.log('âœ… MongoDB connected successfully');
  } catch (error) {
    console.error('âŒ MongoDB connection error:', error);
    process.exit(1);
  }
};

export const disconnectDB = async () => {
  return mongoose.disconnect();
};
















