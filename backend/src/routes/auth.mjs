import express from 'express';
import { login, register } from '../controllers/authController.mjs';

const router = express.Router();

// Auth routes
router.post('/login', login);     // User login
router.post('/register', register); // User registration

export default router;
