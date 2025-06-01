import express from 'express';
import { auth } from '../middlewares/auth.js';
import { createPurchase, getUserPurchases } from '../controllers/purchaseController.js';

const router = express.Router();

router.post('/', auth, createPurchase);
router.get('/user', auth, getUserPurchases);

export default router;