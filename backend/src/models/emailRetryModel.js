import mongoose from "mongoose";

const emailSchema = new mongoose.Schema({ 
  emailData: {
    type: Object,
    required: true
  },
  errorMessage: {
    type: String,
  },
  attempts: {
    type: Number,
    default: 1,
  },
  nextRetryAt: {
    type:Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['PENDING','SENT','FAILED'],
    default: 'PENDING',
  }
}, {timestamps: true,});

const retryEmail = mongoose.model('RetryEmail', emailSchema);

export default retryEmail;