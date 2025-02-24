import express from 'express';
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/user.controller.js';

const router = express.Router();

// Rutas
router.get('/', getAllUsers); // /api/users/
router.get('/:id', getUserById); // /api/users/:id
router.post('/', createUser); // /api/users/
router.put('/:id', updateUser); // /api/users/:id
router.delete('/:id', deleteUser); // /api/users/:id

export default router;
