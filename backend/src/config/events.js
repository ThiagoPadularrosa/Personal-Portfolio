import { server } from "../../server.js";

export async function gracefulShutdown(signal) {
  console.log(`Received ${signal}. Closing MongoDB connection, OpenTelemetry SDK, and HTTP server...`);
  server.close(async () => {
    console.log('HTTP server closed');
    try {
    await mongoose.connection.close(false, () => {
        console.log('MongoDB connection closed');
        process.exit(0);
      });
    await sdk.shutdown();
    console.log('MongoDB and OpenTelemetry SDK closed successfully');
    process.exit(0);   
  } catch (error) { 
    console.error('Error during graceful shutdown:', error);
    process.exit(1);
  }
  });

  setTimeout(() => {
    console.error('Forcing shutdown due to timeout');
    process.exit(1);
  }, 10000);
};