import { z } from 'zod';
import sanitizeHtml from 'sanitize-html';

// Validation means checking if the data is correct before sending it to the database.

// Validation schema for the contact form using the library Zod.
export const contactFormSchema = z.object({
  username: z.string()
    .trim()
    .toLowerCase()
    .min(3, "Username must be at least 3 characters long")
    .max(20, 'Username must be at most 20 characters long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username only can contain letters, numbers, and underscores')
    .transform((val) => val.charAt(0).toUpperCase() + val.slice(1)), // Capitalize the first letter always

    lastname: z.string()
    .trim()
    .toLowerCase()
    .min(3, "Lastname must be at least 3 characters long")
    .max(20, 'Lastname must be at most 20 characters long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Lastname only can contain letters, numbers, and underscores')
    .transform((val) => val.charAt(0).toUpperCase() + val.slice(1)), // Capitalize the first letter always
    
    email: z.string()
    .trim()
    .min(1, 'Email requires at least 1 character')
    .refine((val) => val.endsWith("@gmail.com"), {
      error: "Only email addresses are allowed",
    })
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Invalid email address')
    .toLowerCase(),

    message: z.string()
    .trim()
    .min(10, "Message must be at least 10 characters long")
    .max(500,"Message cannot exceed 500 characters")
    .transform((val) => val.charAt(0).toUpperCase() + val.slice(1)) // Capitalize the first letter always
    .transform((val) => sanitizeHtml(val, {
      allowedTags: ['b', 'i', 'u', 'em', 'strong', 'a'], // Allowed tags for sanitization in the message
      allowedAttributes: {
        'a': ['href', 'target'] // This only allowed href and target atributes for the 'a' tag
      },
      allowedSchemes: ['http', 'https', 'mailto'], // Allowed schemes for the 'a' tag in the message
      allowedIframeHostnames: ['www.youtube.com'], 
    })),

    checkbox: z.coerce.boolean()
    .refine((val) => val === true, {
      error: "You must accept the policy and conditions",
    })
});

// This is just to see if the sanitization of the message works properly
// const result = contactFormSchema.parse({
//   username: "Thiago",
//   lastname: "Gonzales",
//   email: "example@gmail.com",
//   message: "<p>Hola<script>alert('hack')</script> <b>Mundo</b></p>",
//   checkbox: true
// })

// console.log(result.message);

export default contactFormSchema;