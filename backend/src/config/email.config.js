import dotenv from 'dotenv';
dotenv.config()

import nodemailer from 'nodemailer';
import config from './config.js';

console.log("Just to see if the credentials are working or im forgetting smth", !!process.env.PORT);
// Create a transporter using SMTP (CONFIGURATION TRANSPORTER)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: true, // The port 465 use true cuz it tell to nodemailer that the conecction needs to be encrypted via SSL/TLS  
  auth: {
    user: process.env.SMTP_USER, // This is always 'resend'
    pass: process.env.RESEND_API_KEY // My API key of ReSend
  },
});

// To verify the connection to my email service
export async function verifyConnection() {
  try {
    await transporter.verify();
    console.log("Server is ready to take our messages");
  } catch (error) {
    console.log("Verification failed:", error)
  }
}

export default transporter;