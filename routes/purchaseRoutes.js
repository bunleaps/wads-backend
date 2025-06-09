import express from "express";
import { auth } from "../middlewares/auth.js";
import { adminAuth } from "../middlewares/adminAuth.js"; // Import adminAuth
import {
  createPurchase,
  getUserPurchases,
  getAllUsers,
  updatePurchaseStatusByAdmin, // Import the new controller function
} from "../controllers/purchaseController.js";

const router = express.Router();

router.post("/", createPurchase);
router.get("/user", auth, getUserPurchases);
router.get("/users_list", getAllUsers);
// Admin route to update purchase status
router.patch("/:id/status", adminAuth, updatePurchaseStatusByAdmin);

export default router;

/**
 * @swagger
 * tags:
 *   - name: Purchases
 *     description: Purchase management endpoints
 */

/**
 * @swagger
 * /api/purchases:
 *   post:
 *     summary: Create Purchases
 *     tags: [Purchases]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Purchase created successfully
 */

/**
 * @swagger
 * /api/purchases/user:
 *   get:
 *     summary: Get User Purchases
 *     tags: [Purchases]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's purchases
 */

/**
 * @swagger
 * /api/purchases/user_list:
 *   get:
 *     summary: Get all users
 *     tags: [Purchases]
 *     responses:
 *       200:
 *         description: List of all users
 */

/**
 * @swagger
 * /api/purchases/{id}/status:
 *   patch:
 *     summary: (Admin) Update purchase status
 *     tags: [Purchases]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, completed, cancelled]
 *     responses:
 *       200:
 *         description: Purchase status updated successfully
 *       403:
 *         description: Admin access required
 */
