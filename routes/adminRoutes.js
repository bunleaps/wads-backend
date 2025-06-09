import express from "express";
import { adminAuth } from "../middlewares/adminAuth.js";
import {
  getAllUsers,
  getUserByUsername,
  updateUser,
  deleteUser,
  getAllTickets,
  getUnassignedTickets,
  getAdminTickets,
  getAllAdmins,
  getAllPurchases, // Import the new controller function
} from "../controllers/adminController.js";

const router = express.Router();

// Existing user management routes
router.get("/users", adminAuth, getAllUsers);
router.get("/users/:username", adminAuth, getUserByUsername);
router.put("/users/:id", adminAuth, updateUser);
router.delete("/users/:id", adminAuth, deleteUser);
router.get("/admins", adminAuth, getAllAdmins); // New route to get all admins

// New ticket management routes
router.get("/tickets", adminAuth, getAllTickets);
router.get("/tickets/unassigned", adminAuth, getUnassignedTickets);
router.get("/tickets/assigned", adminAuth, getAdminTickets);
router.get("/purchases", adminAuth, getAllPurchases); // New route to get all purchases

export default router;


/**
 * @swagger
 * tags:
 *   - name: Admin
 *     description: Admin management endpoints
 */

/**
 * @swagger
 * /api/admin/admins:
 *   get:
 *     summary: Get All Admins
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all admin users
 *       403:
 *         description: Admin access required
 */

/**
 * @swagger
 * /api/admin/users:
 *   get:
 *     summary: Get All Users
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *       403:
 *         description: Admin access required
 */

/**
 * @swagger
 * /api/admin/users/{username}:
 *   get:
 *     summary: Get User by username
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User details
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/admin/users/{id}:
 *   put:
 *     summary: Get User by ID & Update
 *     tags: [Admin]
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
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               role:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       404:
 *         description: User not found
 *
 *   delete:
 *     summary: Get User by ID & Delete
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /api/admin/tickets:
 *   get:
 *     summary: Get all tickets
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all tickets
 */

/**
 * @swagger
 * /api/admin/tickets/unassigned:
 *   get:
 *     summary: Get all unassigned tickets
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of unassigned tickets
 */

/**
 * @swagger
 * /api/admin/tickets/assigned:
 *   get:
 *     summary: Get all assigned tickets
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of assigned tickets
 */

/**
 * @swagger
 * /api/admin/purchases:
 *   get:
 *     summary: Get all purchases
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of all purchases
 */
