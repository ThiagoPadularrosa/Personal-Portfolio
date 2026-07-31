import nodemailer from 'nodemailer'
import config from './config.js'

console.log("Just to see if the credentials are working or im forgetting smth", !!process.env.EMAIL_FROM);

// Create a transporter using SMTP (CONFIGURATION TRANSPORTER)
export const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: true, // The port 465 use true cuz it tell to nodemailer that the conecction needs to be encrypted via SSL/TLS  
  auth: {
    user: config.SMTP_USER, // This is always 'resend'
    pass: config.RESEND_API_KEY, // My API key of ReSend
  },
});

// To verify the connection to my email service
async function verifyConnection() {
  try {
    await transporter.verify();
    console.log("Server is ready to take our messages");
  } catch (error) {
    console.log("Verification failed:", error)
  }
}

// The execution function to send a message
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    // This is the message with the email content and headers 
    const mailOptions = {
      from: config.EMAIL_FROM,
      to,
      subject,
      text,
      html,
    };

    // The callback. If this is omitted, sendMail return only a Promise.
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.message.Id);

    if (info.rejected.length > 0) {
      console.warn("Some recipients were rejected by the server:", info.rejected);
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
        await sendSystemAlertAdmin("SMTP login credentials rejected.");
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
    throw error; // This goes forward to your main app controller 
  }
}