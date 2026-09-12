import variables from "../config/config.js";
import retryEmail from "../models/emailRetryModel.js";

export async function pushToRetryQueue(emailData, error) {
  await retryEmail.create({
      emailData,
      errorMessage: error.message,
      attempts: 1,
      nextRetryAt: new Date(Date.now() + 5000),
      status: 'PENDING',
  });
}

export async function processDbRetryQueue() {
  const pendingRetries = await retryEmail.find({
    status: 'PENDING', 
    nextRetryAt: { $lte: new Date() }
  });

  for (const record of pendingRetries) {

    // Here is the attempt to send the email again
    try {
      const response = await fetch(variables.RESEND_API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${variables.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(record.emailData),
      });
      
      const data = await response.json();
      if (!response.ok) {
        const error = new Error(data.message || 'Resend API error');
        error.status = response.status;
        error.resendCode = data.name;
        throw error;
      }


      await retryEmail.findByIdAndUpdate(record._id, {
        status: 'SENT', 
        errorMessage: undefined,
      });


    } catch (error) {


      if (record.attempts >= 5) {
        await retryEmail.findByIdAndUpdate(record._id, { 
          status: 'FAILED',
          errorMessage: error.message, 
        });
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