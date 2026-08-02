import dotenv from 'dotenv';
dotenv.config()

import nodemailer from 'nodemailer';
import transporter from '../config/email.config.js';
import config from '../config/config.js';

// The execution function to send a message
export async function sendEmail({ to, subject, text, html }) {
  try {
    // This is the message with the email content and headers 
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    };

    // The callback. If this is omitted, sendMail return only a Promise.
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);

    if (info.rejected.length > 0) {
      console.warn("Some recipients were rejected by the server:", info.rejected);
    } else if (!info.accepted || info.accepted.length === 0) {
      return console.warn("There are no recipients that accepted the message.");
    }
    return info;
  } catch (error) {
    // This checks for specific Nodemailer error codes
    switch(error.code) {
      case "ECONNECTION":
      case "ETIMEDOUT":
        console.error("Network issue. Queueing for automatic retry...", error.message);
        await pushToRetyQueue(mailOptions);
        break;  

      case "EAUTH":
        console.error("CRITICAL: SMTP Authentication failed. Alerting internal dev team...", error.message);
        break;
      
      case "EENVELOPE":
        console.error("Validation error: Invalid addresses.", error.message);
        console.error("Rejected emails list:", error.message || []);
        break;

        default:
          // The Fall back that runs when the main code (above) fails, to reading raw SMTP response codes if available
          if (error.responseCode && error.responseCode >= 400 && error.responseCode < 500) {
            console.warn(`Temporary SMTP Error ${error.responseCode}. Will retry.`);
            await pushToRetyQueue(mailOptions);
          } else {
              console.error(`Fatal SMTP Error ${error.responseCode || 'Unknown'}:`, error.message)
          }
          break;
    }
    throw error; // This goes forward to my main app controller 
  }
}