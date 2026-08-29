import { SpanStatusCode, trace } from "@opentelemetry/api";


export async function callEmailTransporter(transporter, mailOptions) {
  const tracer = trace.getTracer('portfolio.email-transporter', '1.0.0');
  
  return tracer.startActiveSpan('call-email-transporter', async (span) => {
    span.setAttribute('email-transporter-operation', 'call');
    span.setAttribute('email.has-transporter', true);
    
    try {
      const result = await transporter.sendMail(mailOptions); 
      console.log("Message sent: %s", result.messageId);
      if (result.rejected.length > 0) {
        console.warn("Some recipients were rejected by the server:", result.rejected);
      } else if (!result.accepted || result.accepted.length === 0) {
        throw new Error('No recipients accepted the email.');
      }  
      span.setStatus({ 
        code: SpanStatusCode.OK, 
        message: 'The call to the transporter was a success', 
      });
      return result;
    } catch (error) {
      span.recordException(error);
      span.setStatus({
        code: SpanStatusCode.ERROR,
        message: error.message,
      });

      throw error;
    } finally {
      span.end()
    }
  });
}