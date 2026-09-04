registerGracefulShutdownHandlers();
import './src/telemetry/telemetry.mjs';
import express from 'express';
import cors from 'cors';
import dns from 'dns';  
import morgan from 'morgan';
import helmet from "helmet";
import config from './src/config/config.js';

import errorHandler from './src/middlewares/errorHandler.js';
import router from './src/Routes/userRoutes.js';
import connectDB from './src/db/connection.js';
import rateLimiterMiddleware from './src/middlewares/rateLimiter.js';
import metricsMiddleware from './src/telemetry/metrics-middleware.js';
import mongoose from 'mongoose';
import { gracefulShutdown, registerGracefulShutdownHandlers } from './src/config/processEvents.js';
import { processDbRetryQueue } from './src/queues/emailQueue.js';
import { verifyEmailServiceConnection } from './src/config/email.config.js';

const app = express();
app.port = config.PORT;

dns.setServers(['8.8.8.8', '8.8.4.4']); // This forces Google DNS

connectDB();
setInterval(async () => { await processDbRetryQueue(); }, 60000);
verifyEmailServiceConnection();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5500',
  'http://localhost:4000',
  'http://127.0.0.1:5500',
  // In production mode i have to add my real domain to allow it
];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    
    // A production check vs. Development check
    if (config.NODE_ENV === 'production') {
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Blocked by Custom CORS Policy'));
      }
    } else {
      // This needs to happen in dev mode, allowing any origin
      callback(null, true);
    }
  },
	methods: 'GET,POST,OPTIONS,PUT,DELETE', // Allowed HTTP methods
	allowedHeaders: ['Content-Type', 'Authorization'], // Allowed HTTP headers
	credentials: true, // Allow cookies/Auth tokens
	optionsSuccessStatus: 200 // Legacy browser support to not choke on 204
};

const isDevelopment = app.get("env") === "development";
app.use(helmet({
    frameguard: { action: 'deny' }, // Sets X-Frame-Options to SAMEORIGIN by default
    contentSecurityPolicy: {
      directives: {
        // Fallback directive for unmapped resource categories
        defaultSrc: ["'self'"],
        // This is to allow scripts from my site (and maybe) or other external domain
        scriptSrc: ["'self'",],
        // This is to allow styles from my site (and maybe) or other external domain
        styleSrc: ["'self'",],
        // This is to allow imgs from my site, data URIs, and specific domains
        imgSrc: ["'self'", "data:",],
        // This is to allow connections (AJAX, WebSockets) to others specific domains
        connectSrc: ["'self'",],
        "upgrade-insecure-requests": isDevelopment ? null : [],
      },
    },
  }),
);  

// Middlewares
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); 
app.use(rateLimiterMiddleware); 
app.use(metricsMiddleware);

// Routes and error handler
app.use('/api', router);
app.use(errorHandler);

console.log(`The server is running on ${config.NODE_ENV} mode`)

export const server = app.listen(config.PORT, () => {
	console.log(`Server is running on http://${config.HOST}:${config.PORT}`);
});

process.once('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.once('SIGINT', () => gracefulShutdown('SIGINT'));