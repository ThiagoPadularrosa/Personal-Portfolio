import { processDbRetryQueue } from "../queues/emailQueue.js";
import variables from "../config/config.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getRetryQueue = asyncHandler (async (req, res) => {
  const authHeader = req.get('authorization');

  if (variables.CRON_SECRET && authHeader !== `Bearer ${variables.CRON_SECRET}`) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    await processDbRetryQueue();
    return res.status(200).json({ success: true, message: 'Queue processed' });
  } catch (error) {
    console.error('Error processing DB retry queue:', error);
    return res.status(500).json({ success: false, error: error.message });
  }
});