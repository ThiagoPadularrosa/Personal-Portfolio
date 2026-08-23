import { trace } from '@opentelemetry/api';
import transporter from '../config/email.config.js';

export async function sendExpensiveEmail(transporter, mailOptions) {
  const tracer = trace.getTracer('', '1.0.0');

  return tracer.startActiveSpan('nodemailer.sendEmail', async (span) => {

  });
}