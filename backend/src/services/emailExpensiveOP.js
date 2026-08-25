import { SpanStatusCode, trace } from '@opentelemetry/api';

export async function sendExpensiveEmail(transporter, mailOptions) {
  const tracer = trace.getTracer('portfolio.email-service', '1.0.0');

  return tracer.startActiveSpan('process.send-expensive-email', async (span) => {
    span.setAttribute('email.operation', 'send');
    span.setAttribute('email.has_recipient', true);
    
    try {
      const result = await transporter.sendMail(mailOptions);
      span.setStatus({ code: SpanStatusCode.OK, message: 'Email sent successfully', });
      span.setAttribute('email.messageId', result.messageId);
      console.log("Message sent: %s", result.messageId);
      if (result.rejected.length > 0) {
        console.warn("Some recipients were rejected by the server:", result.rejected);
      } else if (!result.accepted || result.accepted.length === 0) {
        throw new Error('No recipients accepted the email.');
      }
      return result;
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