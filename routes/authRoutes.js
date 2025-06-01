import express from 'express';
import { signup, signin, verifyEmail } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup);
router.post('/verify-email', verifyEmail);
router.post('/signin', signin);

export default router;