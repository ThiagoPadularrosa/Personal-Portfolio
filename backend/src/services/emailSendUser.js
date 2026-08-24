import { SpanStatusCode, trace } from '@opentelemetry/api';
import { sendEmail } from "./email.service.js";
 
export default function emailSendUser({ username, lastname, email, message }) {
  const tracer = trace.getTracer('portfolio.email-service', '1.0.0');

  return tracer.startActiveSpan('process-email-service', async (span) => {
    try {
      // Attempting the email send
      await sendEmail ({       
        to: 'padularrosathiago26@gmail.com',
        subject: `New message from ${username}`,
        text: `From: ${email}\n\nMessage: ${message}`,
        html: `
          <h2>New Message</h2>
          <p><strong>Username: ${username}</strong></p>
          <p><strong>Lastname: ${lastname}</strong></p>
          <p><strong>From:</strong> ${email}</p>
          <p>${message}</p>
        `,
      });
      span.setStatus({ code: SpanStatusCode.OK, message: 'Email sent successfully', });
      span.setAttribute('email-service.operation', 'send-email');  
      span.setAttribute('email-service.success', true);
    } catch (error) {
      span.recordException(error);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message,
      });
      throw error
    } finally {
      span.end();
    }
  });
}