import express from 'express';
import { getRetryQueue } from "../controllers/cronController.js";
const router = express.Router();

router.get('/cron/retry-queue', getRetryQueue);

export default router;