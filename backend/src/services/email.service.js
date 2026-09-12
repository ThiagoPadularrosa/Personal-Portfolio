import transporter from '../config/email.config.js';
import { SpanStatusCode, trace } from '@opentelemetry/api';
import config from '../config/config.js'; 
import { pushToRetryQueue } from '../queues/emailQueue.js';

// The execution function to send a message
export async function sendEmail({ to, subject, text, html }) {
  const tracer = trace.getTracer('portfolio.email-service', '1.0.0');

  return tracer.startActiveSpan('send-email', async (span) => {
    try {
      // Prepare mailOptions
      const mailOptions = await tracer.startActiveSpan('prepare-mail-options', async (span) => {
        try {
          // This is the message OBJECT
          const options = {
            from: config.EMAIL_FROM,
            to,
            subject,
            text,
            html,
          };
          span.setAttribute('email-option.operation', 'prepare');
          span.setAttribute('email-option.success', true);
          span.setStatus({  
            code: SpanStatusCode.OK, 
            message: 'Email options prepared successfully',
          });
          return options;
        } catch (error) {
          span.recordException(error);
          span.setStatus({ 
            code: SpanStatusCode.ERROR,
            message: error.message,
            });           
          throw error;
        } finally {
          span.end();
        }
      });
      // Send Email
      await tracer.startActiveSpan('send-expensive-email', async (span) => {
        span.setAttribute('email.operation', 'send');
        span.setAttribute('email.has_recipient', true);

        try {
          const result = await tracer.startActiveSpan('call-email-transporter', async (span) => {
            span.setAttribute('email.transporter.operation', 'call');
            span.setAttribute('email.transporter.pool', true);
            span.setAttribute('email.has.transporter', true);
            span.setAttribute('email.transporter.max_connections', 1);
            span.setAttribute('email.smtp.port', config.SMTP_PORT);

              try {
              const info = await transporter.sendMail(mailOptions); 
              console.log("Message sent: %s", info.messageId);
              if (info.rejected.length > 0) {
                console.warn("Some recipients were rejected by the server:", info.rejected);
              } else if (!info.accepted || info.accepted.length === 0) {
                throw new Error('No recipients accepted the email.');
              }  
              span.setStatus({ 
                code: SpanStatusCode.OK, 
                message: 'The call to the transporter was a success', 
              });
              return info;
            } catch (error) {
              span.recordException(error);
              span.setStatus({
                code: SpanStatusCode.ERROR,
                message: error.message,
              });

              throw error;
            } finally {
              span.end();
            }
          });
          span.setStatus({ code: SpanStatusCode.OK, message: 'Email sent successfully', });
          span.setAttribute('email.messageId', result.messageId);
        } catch (error) { 
          span.recordException(error);
          span.setStatus({ 
            code: SpanStatusCode.ERROR,
            message: `Failed to send the email: ${error.message}`,
          });
       
          throw error;
        } finally {
          span.end();
        }
      });

      span.setAttribute('email-service.feature', 'send');
      span.setAttribute('email-service.operation', 'send-email');
      span.setAttribute('email-service.success', true);
      
      span.setStatus({
        code: SpanStatusCode.OK,
        message: 'Email sent successfully',
      });
    } catch (error) {
      span.recordException(error);
      span.setStatus({ 
        code: SpanStatusCode.ERROR,
        message: error.message,
      });
      switch(error.code) {
        case "ECONNECTION":
        case "ETIMEDOUT":
          console.error("Network issue. Queueing for automatic retry...", error.message);
          await pushToRetryQueue(mailOptions, error);
          break;  

        case "EAUTH":
          console.error("CRITICAL: SMTP Authentication failed. Alerting internal dev team...", error.message);
          await pushToRetryQueue(mailOptions, error);
          break;
        
        case "EENVELOPE":
          console.error("Validation error: Invalid addresses.", error.message);
          console.error("Rejected emails list:", error.message || []);
          await pushToRetryQueue(mailOptions, error);
          break;

        default:
          // The Fall back that runs when the main code (above) fails, to reading raw SMTP response codes if available
          if (error.responseCode && error.responseCode >= 400 && error.responseCode < 500) {
            console.warn(`Temporary SMTP Error ${error.responseCode}. Will retry.`);
          } else {
            console.error(`Fatal SMTP Error ${error.responseCode || 'Unknown'}:`, error.message);
          }
          break;
      }
      throw error; // This goes forward to my main app controller 
    } finally {
      span.end();
    }
  });
}