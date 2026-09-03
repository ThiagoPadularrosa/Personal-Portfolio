import nodemailer from 'nodemailer';
import config from './config.js';

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: false,
  pool: true,
  maxConnections: 1,
  auth: {
    user: config.SMTP_USER,
    pass: config.RESEND_API_KEY
  },
  logger: true,
  debug: true,
});

// To verify the connection to my email service
export async function verifyConnection() {
  try {
    const start = performance.now();
    await transporter.verify();
    const duration = performance.now() - start;
    console.log(`SMTP verify: ${duration.toFixed(2)} ms`);
  } catch (error) {
    console.log("Verification failed:", error);
  }
}

export default transporter;