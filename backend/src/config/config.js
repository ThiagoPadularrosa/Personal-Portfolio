import dotenv from 'dotenv';
dotenv.config();

export const variables = {
  // Server Configuration
  PORT: process.env.PORT         || 4000,
  NODE_ENV: process.env.NODE_ENV,
  HOST: process.env.HOST         || 'localhost',
  MONGODB_URI: process.env.MONGODB_URI,
  // EMAIL SERVICE CREDENTIALS
  SMTP_HOST: process.env.SMTP_HOST   || 'smtp.resend.com',
  SMTP_PORT: process.env.SMTP_PORT   || '465',
  SMTP_USER: process.env.SMTP_USER   || 'resend',
  EMAIL_FROM: process.env.EMAIL_FROM || 'onboarding@resend.dev',
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  RESEND_API_URL: process.env.RESEND_API_URL || 'https://resend.com',
  // Frontend URL
  FRONTEND_URL: process.env.FRONTEND_URL,
  // OpenTelemetry Credentials
  OTEL_SERVICE_NAME: process.env.OTEL_SERVICE_NAME || 'star-future',
  SERVICE_VERSION: process.env.SERVICE_VERSION || '1.0.0',
  // Cron-Jobs Credentials
  CRON_SECRET: process.env.CRON_SECRET,
}

export default variables;