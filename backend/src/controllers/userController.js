import mongoose from "mongoose";
import User from '../models/userModel.js'
import asyncHandler from "../utils/asyncHandler.js";
import contactFormSchema from "../Validations/schemas.js";
import { sendEmail } from "../config/email.config.js";

// CRUD code for the HTTP requests -- Create User
// AsyncHandler only catches unhandled promise rejections from my Express route
export const postUsers = asyncHandler (async (req, res) => {
  const result = contactFormSchema.safeParse(req.body);
  const { email, name, message } = req.body;

  // Database logic
    if (!result.success) {
    console.log('Failed to received the data:', result.error.issues);
    return res.status(400).json({ errors: result.error.issues });
  }

  try {
    
    // Before using result.data i have to validate it first
    const user = await User.create(result.data);
    if (!user) throw new Error(`User cannot be created.`); // Directly throw
    
    // Attempting the email send
    await sendEmail ({       
      to: 'padularrosathiago@gmail.com',
      subject: `New message from ${name}`,
      text: `From: ${email}\n\nMessage: ${message}`,
      html: `<p><strong>From:</strong> ${email}</p><p>${message}</p>`,
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.log('Failed to send the email.', error.message);
  }

  console.log('The data has been received successfully', result.data);
  return res.status(201).json({ 
    success: true,
    message: 'Client data processed',
    data: result.data
   })
      
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