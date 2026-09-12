import config from '../config/config.js'; 
import { pushToRetryQueue } from '../queues/emailQueue.js';
import { SpanStatusCode, trace } from '@opentelemetry/api';

// The execution function to send a message
export async function sendEmail({ to, subject, text, html }) {
  const tracer = trace.getTracer('portfolio.email-service', '1.0.0');
  
  return tracer.startActiveSpan('email-api', async (span) => {
    let mailOptions;
    try {
      // Prepare mailOptions
      mailOptions = await tracer.startActiveSpan('prepare-mail-options', async (span) => {
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
      await tracer.startActiveSpan('send-email', async (span) => {
        span.setAttribute('email.provider', 'resend');
        span.setAttribute('email.protocol', 'https');
        span.setAttribute('server.address', 'api.resend.com');

        try {
          const result = await tracer.startActiveSpan('call-resend-api', async (span) => {
            span.setAttribute('email.api.operation', 'send');

              try {
              const response = await fetch(config.RESEND_API_URL, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${config.RESEND_API_KEY}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(mailOptions),
              }); 
              const data = await response.json();
              if (!response.ok) {
                const error = new Error(data.message || 'Resend API error');
                error.status = response.status;
                error.resendCode = data.name;
                throw error;
              }
              span.setStatus({ 
                code: SpanStatusCode.OK, 
                message: 'The call to the Resend API succeeded', 
              });
              return data;
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
          span.setAttribute('email.message_id', result.id);
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
      switch(error.status) {
        case 401:
          console.error("Authentication error:", error.message);
          break;  

        case 422:
          console.error("Validation failed:", error.message);
          break;
        
        case 404:
          console.error("Endpoint or resource not found:", error.message);
          break;

        case 429:
          console.error("Too many requests:", error.message);
          if (mailOptions) {
            await pushToRetryQueue(mailOptions, error);
          }
          break;


        default:
          // The Fall back that runs when the main code (above) fails, to reading raw HTTP response codes if available
          if (error.status >= 500) {
            console.error('Resend API temporary failure:', error.message);
            if (mailOptions) {
              await pushToRetryQueue(mailOptions, error);
            }
          } else {
            console.error('An unhandled error occurred:', error.name, error.message);
          }
          break;
      }

      throw error; // This goes forward to my main app controller 
    } finally {
      span.end();
    }
  });
}