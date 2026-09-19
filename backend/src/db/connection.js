import mongoose from "mongoose";
import variables from "../config/config.js";


let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB =  async () => {
  if (variables.NODE_ENV !== 'production') {
    try {
      // This function as a way to establish connection using a secure env variable
      const conn = await mongoose.connect(variables.MONGODB_URI);
    
      console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit(1); // This works as a killer, to kill the process if the connection fails
    }

    mongoose.connection.on('disconnected', () => {
      console.log("MongoDB connection lost. Reconnecting...");
    });

  } else if (variables.NODE_ENV === 'production') {
    if (cached.conn) {
      return cached.conn;
    }
    
    if (!cached.promise) {
      const opts = {
        bufferCommands: false, // Turn off buffering so queries fail quickly if disconnected
        serverSelectionTimeoutMS: 5000, 
        maxPoolSize: 10,
      }

    cached.promise = await mongoose.connect(variables.MONGODB_URI, opts).then((mongooseInstance) => {
        console.log(`MongoDB connected: ${mongooseInstance.connection.host}`);
        return mongooseInstance;
      });
    }

    try {
      cached.conn = await cached.promise;
    } catch (error) {
      cached.promise = null;
      console.error(`MongoDB Connection Error: ${error.message}`);
      throw error;
    }

    return cached.conn;
  }
};

export default connectDB;