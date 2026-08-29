import { SpanStatusCode, trace } from "@opentelemetry/api";
import config from '../config/config.js';

export async function prepareEmailOptions({ to, subject, text, html }) {
  const tracer = trace.getTracer('portfolio.email-options', '1.0.0');

  return tracer.startActiveSpan('prepare-mail-options', async (span) => {
    try {
      // This is the message OBJECT
      const mailOptions = {
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
      return mailOptions;
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
}