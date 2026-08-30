import nodemailer from 'nodemailer';
import config from './config.js';

const messageQueue = ['Message 1', 'Message 2', 'Message 3'];

// Create a transporter using SMTP
const transporter = nodemailer.createTransport({
  host: config.SMTP_HOST,
  port: config.SMTP_PORT,
  secure: false,
  pool: true,
  maxConnections: 5,
  auth: {
    user: config.SMTP_USER,
    pass: config.RESEND_API_KEY
  },
  logger: true,
  debug: true,
});

async function getNextMessage() {
  if (messageQueue.length === 0) {
    console.log('No messages left in the queue.');
    return null;
  }
  // Removes and returns the first message from the array
  return messageQueue.shift();
}

// Loop condition 
transporter.on('idle', async () => {
  console.log('Transporter is idle. Fetching the next message...');

  // Check if the transporter can send more messages right now8
  while (transporter.isIdle()) {
    const nextMessage = await getNextMessage();

    if (!nextMessage) {
      break;
    }

    try {
      await transporter.send(nextMessage);
    } catch (error) {
      console.log(`Failed to send the message: ${nextMessage}`, error);
    }
  }
});

process.on("SIGTERM", () => {
  transporter.close();
  process.exit(0);
});

// To verify the connection to my email service
export async function verifyConnection() {
  const start = performance.now();
  try {
    await transporter.verify();
    const duration = performance.now() - start;
    console.log(`SMTP verify: ${duration.toFixed(2)} ms`);
  } catch (error) {
    console.log("Verification failed:", error);
  }
}

export default transporter;