import dotenv from 'dotenv';
dotenv.config();

export const variables = {
  // Server Configuration
  PORT: process.env.PORT         || 4000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  HOST: process.env.HOST         || 'localhost',
  MONGO_URI: process.env.MONGO_URI,
  // EMAIL SERVICE CREDENTIALS
  SMTP_HOST: process.env.SMTP_HOST   || 'smtp.resend.com',
  SMTP_PORT: process.env.SMTP_PORT   || '465',
  SMTP_USER: process.env.SMTP_USER   || 'resend',
  EMAIL_FROM: process.env.EMAIL_FROM || 'onboarding@resend.dev',
  RESEND_API_KEY: process.env.RESEND_API_KEY,
  // Frontend URL
  FRONTEND_URL: process.env.FRONTEND_URL,
  // OpenTelemetry Credentials
  OTEL_SERVICE_NAME: process.env.OTEL_SERVICE_NAME || 'star-future',
  SERVICE_VERSION: process.env.SERVICE_VERSION || '1.0.0',
}

export default variables;