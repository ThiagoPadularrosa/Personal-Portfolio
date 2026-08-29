import { SpanStatusCode, trace } from '@opentelemetry/api';
import { callEmailTransporter } from './emailTransporter.js';

export async function sendExpensiveEmail(transporter, mailOptions) {
  const tracer = trace.getTracer('portfolio.email-service', '1.0.0');

  return tracer.startActiveSpan('send-expensive-email', async (span) => {
    span.setAttribute('email.operation', 'send');
    span.setAttribute('email.has_recipient', true);
    
    try {
      const result = await callEmailTransporter(transporter, mailOptions);
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
}