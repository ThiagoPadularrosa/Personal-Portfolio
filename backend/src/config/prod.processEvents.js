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