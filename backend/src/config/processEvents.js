import mongoose from "mongoose";
import sdk from "../telemetry/telemetry.mjs";
import { server } from "../../server.js";
import transporter from "./email.config.js";

export async function gracefulShutdown(signal) {
  console.log(`Received ${signal}. Closing MongoDB connection, OpenTelemetry SDK, and HTTP server...`);
  const forceExit = setTimeout(() => {
    console.error('Forcing shutdown due to timeout');
    process.exit(1);
  }, 10000);
  server.close(async () => {
    try {
    await mongoose.connection.close();
    await sdk.shutdown();
    transporter.close();
    clearTimeout(forceExit);
    console.log('MongoDB, transporter and OpenTelemetry SDK closed successfully');
    process.exit(0);    
  } catch (error) { 
    console.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
  });
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