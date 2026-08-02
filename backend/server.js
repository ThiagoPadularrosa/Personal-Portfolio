import dotenv from 'dotenv';
dotenv.config()

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dns from 'dns';  
import morgan from 'morgan';
import config from './src/config/config.js';

import errorHandler from './src/middlewares/errorHandler.js';
import { verifyConnection } from './src/config/email.config.js';
import router from './src/Routes/userRoutes.js';
import connectDB from './src/db/connection.js';
const app = express();
app.port = config.PORT;

dns.setServers(['8.8.8.8', '8.8.4.4']); // This forces Google DNS

connectDB(); // To establish a consistent connection between Node.js app and my database (MongoDB)
verifyConnection(); // To verify the connection to my email service

const allowedOrigins = [
  'http://localhost:5500',
  'http://localhost:4000',
  'http://localhost:5173',
  'http://127.0.0.1:5500'
  // In production mode i have to add my real domain to allow it
];

const corsOptions = {
  origin: function (origin, callback) {
    // This allows any req from any server. So, i have to change it in PR mode. RISK
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Blocked by Custom CORS Policy'));
    }
  },
	methods: 'GET,POST,OPTIONS,PUT,DELETE', // Allowed HTTP methods
	allowedHeaders: ['Content-Type', 'Authorization'], // Allowed HTTP headers
	credentials: true, // Allow cookies/Auth tokens
	optionsSuccessStatus: 200 // Legacy browser support
};
// APP.USE works to register middlewares and routes. The order is very important.
// Middlewares
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes and error handler
app.use('/api', router);
app.use(errorHandler); // This is my error handler middleware that will catch any error that is not handled by my routes

console.log(`The server is running on ${config.NODE_ENV} mode`)

app.listen(config.PORT, () => {
	console.log(`Server is running on http://${config.HOST}:${config.PORT}`);
});