import config from "../config/config.js" 
import mongoose from "mongoose";

const connectDB =  async () => {
  try {
    // This function as a way to establish connection using a secure env variable
    const conn = await mongoose.connect(process.env.MONGO_URI);
  
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1); // This works as a killer, to kill the process if the connection fails
  }
};

export default connectDB;