import mongoose, { mongo } from "mongoose";
import sdk from "../telemetry/telemetry.mjs";
import variables from "./config.js";
import connectDB from "../db/connection.js";
import User from "../models/userModel.js";

export async function gracefulShutdown(signal) {
  if (variables.NODE_ENV !== 'production') {
    console.log(`Received ${signal}. Closing MongoDB connection, OpenTelemetry SDK, and HTTP server...`);
    const forceExit = setTimeout(() => {
      console.error('Forcing shutdown due to timeout');
      process.exit(1);
    }, 10000);
    server.close(async () => {
      try {
      await mongoose.connection.close();
      await sdk.shutdown();
      clearTimeout(forceExit);
      console.log('MongoDB and OpenTelemetry SDK closed successfully');
      process.exit(0);    
    } catch (error) { 
      console.error('Error during graceful shutdown:', error);
      process.exit(1);
    }
    });
  } else if (variables.NODE_ENV === 'production') {
    console.log(`Received ${signal}: Cleaning up Vercel functions resources and connections.`);
    
    await connectDB();
    await sdk.shutdown();
    try {
      const users = await User.find({});
      console.log("Cleanup complete. Shutting down safely:", users);
    } catch (error) {
      console.error('Error during graceful shutdown cleanup:', error);
    }
  }
};

export function registerGracefulShutdownHandlers() {
  if (variables.NODE_ENV !== 'production') {
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
      process.exit(1);
    });
    process.on('uncaughtException', (err, origin) => {
      console.error(`Caught Exception: ${err}`);
      console.error(`Exception origin: ${origin}`);
      process.exit(1);
    });
  } else if (variables.NODE_ENV === 'production') {
    process.on('unhandledRejection', (reason, promise) => {
      console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    });
    process.on('uncaughtException', (err, origin) => {
      console.error(`Caught Exception: ${err}`);
      console.error(`Exception origin: ${origin}`);
    });
  }
}