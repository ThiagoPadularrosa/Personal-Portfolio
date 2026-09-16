import mongoose, { mongo } from "mongoose";
import sdk from "../telemetry/telemetry.mjs";
import { server } from "../../server.js";
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
    console.log(`Received ${signal}: Cleaning up Vercel functions resources.`);
    await connectDB();
    try {
      const users = await User.find({});
      res.status(200).json({ success: true, data: users });
      console.log("Cleanup complete. Shutting down safely.");
    } catch (error) {
      console.error('Error during graceful shutdown cleanup:', error);
      res.status(400).json({ success: false });
    }
  }
};

export function registerGracefulShutdownHandlers() {
  process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
  });
  process.on('uncaughtException', (err, origin) => {
    console.error(`Caught Exception: ${err}`);
    console.error(`Exception origin: ${origin}`);
    process.exit(1);
  });
}