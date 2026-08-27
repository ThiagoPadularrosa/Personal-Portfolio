import mongoose from "mongoose";
import User from '../models/userModel.js';
import asyncHandler from "../utils/asyncHandler.js";
import contactSchema from "../Validators/schemas.js";
import config from '../config/config.js'; 
import emailSendUser from "../services/emailSendUser.js";
import { SpanStatusCode, trace } from '@opentelemetry/api';

// AsyncHandler only catches unhandled promise rejections from my Express route
export const postUsers = asyncHandler (async (req, res) => {
  const result = contactSchema.safeParse(req.body);
  const tracer = trace.getTracer('portfolio.business-logic', '1.0.0');
  const span = trace.getActiveSpan();
  // Enriching the existed auto-instrumentation span
  if (span) {
    span.setAttribute('api.version', 'v1');
    span.setAttribute('api.operation', 'contact-form-submitted');
    span.setAttribute('api.feature', 'contact'); 
  }
  // Database logic
  if (!result.success) {
    span?.setAttribute('form.validation', 'failed');
    console.log('Failed to received the data:', result.error.issues);
    return res.status(400).json({ errors: result.error.issues });
  }
  span.setAttribute('form.validation', 'passed');

  const { username, lastname, email, message, checkbox } = result.data;
  

  return tracer.startActiveSpan('process-contact-form', async (businessSpan) => {
    try {
      // Before using result.data i have to validate it first
      const user = await User.create(result.data);
      if (!user) {
        throw new Error(`User cannot be created.`);
      }

      businessSpan.setAttribute('db.operation', 'insert');
      businessSpan.setAttribute('db.success', true);
      
      await emailSendUser({ username, lastname, email, message }); // Calling the email service to send

      if (config.NODE_ENV !== 'production') {
        console.log('The data has been received successfully', result.data);
      }
      console.log(`Contact form submitted by ${username}`);

      return res.status(201).json({ 
        success: true,
        message: 'Client data processed',
      })    
    } catch (error) {
      businessSpan.recordException(error);
      businessSpan.setStatus({ 
        code: SpanStatusCode.ERROR, 
        message: error.message, 
      });
      console.log('Failed to send the form.', error.message);
      return res.status(500).json({ 
        success: false,
        message: 'Something went wrong, please try again.'
      });
    } finally {
      businessSpan.end();
    }
  });
});

// READ ALL USERS
export const getUsers = asyncHandler (async (req, res) => {
  const users = await User.find();

  if(!users || users.length === 0) {
    return res.status(404).json({ message: 'User not found' })
  } 

  res.status(200).json({ message: 'Fetch all items', data: users });
});

// FETCH BY USERID
export const getUserById = asyncHandler (async (req, res) => {
  const { id } = req.params; // GET ID FROM URL PARAMETERS
  const user = await User.findById(id);

  if(!user) {
    return res.status(404).json({ message: 'UserId not found' })
  }

  res.status(200).json({ message: 'UserId was found', data: user })
});

// UPDATE AN EXISTING FILE (USER)
export const patchUpdateById = asyncHandler (async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndUpdate(id, req.body, {returnDocument: 'after'});

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  res.status(200).json({ message: 'User found and updated', data: user })
});

// DELETE A FILE (USER)
export const deleteUserById = asyncHandler (async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(404).json({ message: 'UserId not found' });
  }

  res.status(200).json({ message: 'Document found and deleted', data: user });
});