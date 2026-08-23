import nodemailer from 'nodemailer';
import config from './config.js';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: true, // The port 465 use true cuz it tell to nodemailer that the conecction needs to be encrypted via SSL/TLS  
  auth: {
    user: config.SMTP_USER, // This is always 'resend'
    pass: config.RESEND_API_KEY
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