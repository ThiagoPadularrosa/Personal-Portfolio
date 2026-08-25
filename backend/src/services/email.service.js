import nodemailer from 'nodemailer';
import transporter from '../config/email.config.js';
import config from '../config/config.js';
import { SpanStatusCode, trace } from '@opentelemetry/api';
import { sendExpensiveEmail } from './emailExpensiveOP.js';

// The execution function to send a message
export async function sendEmail({ to, subject, text, html }) {
  const tracer = trace.getTracer('portfolio.email-service', '1.0.0');

  return tracer.startActiveSpan('process.send-email', async (span) => {
    try {
      // This is the message with the email content and headers 
      const mailOptions = {
        from: config.EMAIL_FROM,
        to,
        subject,
        text,
        html,
      };
      await sendExpensiveEmail(transporter, mailOptions);

      span.setAttribute('email-service.feature', 'send');
      span.setAttribute('email-service.operation', 'send-email');
      span.setAttribute('email-service.success', true);
    } catch (error) {
      span.recordException(error);
      span.setStatus({ 
        code: SpanStatusCode.ERROR,
        message: error.message,
      });
      // This checks for specific Nodemailer error codes
      switch(error.code) {
        case "ECONNECTION":
        case "ETIMEDOUT":
          console.error("Network issue. Queueing for automatic retry...", error.message);
          await pushToRetryQueue(mailOptions);
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
            await pushToRetryQueue(mailOptions);
          } else {
            console.error(`Fatal SMTP Error ${error.responseCode || 'Unknown'}:`, error.message)
          }
          break;
      }
      throw error; // This goes forward to my main app controller 
    } finally {
      span.end();
    }
  });
}