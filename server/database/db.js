import mongoose from "mongoose";
import dotenv from "dotenv";

// Make sure dotenv is configured before accessing process.env
dotenv.config();

const connectDB = async () => {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      console.error("MONGODB_URI is not defined in environment variables");
      return;
    }
    
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;