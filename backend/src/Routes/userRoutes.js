import express from 'express';
import mongoose from 'mongoose';
import { getUsers, getUserById, postUsers, patchUpdateById, deleteUserById } from '../controllers/userController.js';
const router = express.Router();

// CRUD HTTP REQUESTS 
router.post('/data', postUsers);  
router.get('/', getUsers);
router.get('/:id', getUserById);
router.patch('/:id', patchUpdateById);
router.delete('/:id', deleteUserById);

export default router;