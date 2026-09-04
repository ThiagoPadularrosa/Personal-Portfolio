import transporter from "../config/email.config.js";
import retryEmail from "../models/emailRetryModel.js";


export async function pushToRetryQueue(emailData, error) {
  await retryEmail.create({
      emailData: JSON.stringify(emailData),
      errorMessage: error.message,
      attempts: 1,
      nextRetryAt: new Date(Date.now() + 5000),
      status: 'pending',
  });
}

export async function processDbRetryQueue() {
  const pendingRetries = await retryEmail.find({
    status: 'PENDING', 
    nextRetryAt: { $lte: new Date() }
  });

  for (const record of pendingRetries) {
    const emailData = JSON.parse(record.emailData);

    try {
      // Here is the attempt to send the email again
      await transporter.sendMail(emailData);
      await retryEmail.findByIdAndUpdate(record._id, { status: 'SENT' });
    } catch (error) {

      if (record.attempts >= 5) {
        await retryEmail.findByIdAndUpdate(record._id, { status: 'FAILED' });
      } else {
        // Exponential backoff calculation (5s * 2^attempts)
        const nextDelay = 5000 * Math.pow(2, record.attempts);
        await retryEmail.findByIdAndUpdate(record._id, {
          status: 'PENDING',
          attempts: record.attempts + 1,
          nextRetryAt: new Date(Date.now() + nextDelay),
          errorMessage: error.message,
        });
      }   
    }
  }
}