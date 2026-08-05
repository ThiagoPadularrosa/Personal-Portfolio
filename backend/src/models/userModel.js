import mongoose from "mongoose";
import { lowercase, maxLength, minLength } from "zod";
import sanitizeHtml from 'sanitize-html';

// Escaping means (as a last resort) to prevent any malicious code from being executed in the database. This is a security measure to prevent any malicious code from being executed in the database.

// Escaping all the inputs before saving them to the database.
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
    match: /^[a-zA-Z0-9_]+$/
  },
  lastname: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 20,
    match: /^[a-zA-Z0-9_]+$/
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true, // Mongoose automatically creates an index for this
    lowercase: true,
    minLength: 2,
    match: [/@gmail\.com$/i, 'The email should finish with @gmail.com']
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minLength: 10,
    maxLength: 500,
    set: (val) => sanitizeHtml(val, {
      allowedTags: ['b', 'i', 'u', 'em', 'strong', 'a',], // Allowed tags for sanitization in the message
      allowedAttributes: {
        'a': ['href', 'target'] // This only allowed the href and target attributes  
    },
    allowedSchemes: ['http', 'https', 'mailto'], // Allowed schemes for the 'a' tag in the message
    allowedIframeHostnames: ["www.youtube.com"], // Allowed hostnames for the 'iframe' tag in the message
  }),
  },
  checkbox: {
    type: Boolean,
    default: false // Checkbox is unchecked as default
  },
  date: {
    type: Date,
    default: Date.now 
  }
});
// CREATE USER COLLECTION
const User = mongoose.model('User', userSchema);

export default User;