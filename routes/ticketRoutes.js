import express from "express";
import { auth } from "../middlewares/auth.js";
import { adminAuth } from "../middlewares/adminAuth.js";
import upload from "../middlewares/upload.js"; // Import multer middleware
import {
  createTicket,
  getTickets,
  getUserTickets,
  getTicketThread,
  addMessage,
  assignAdmin,
  updateTicketStatus,
} from "../controllers/ticketController.js";

const router = express.Router();

// User routes
router.get("/", auth, getTickets); // Will show all tickets for admin, user's tickets for regular users
router.get("/my-tickets", auth, getUserTickets); // Only user's tickets
router.post("/", auth, upload.array("attachments", 5), createTicket); // Added upload middleware
router.get("/:id", auth, getTicketThread);
router.post("/:id/messages", auth, upload.array("attachments", 5), addMessage); // Added upload middleware
router.patch("/:id/status", adminAuth, updateTicketStatus); // Changed to adminAuth and ensured import

// Admin routes
router.patch("/:id/assign", adminAuth, assignAdmin);

export default router;

/**
 * @swagger
 * tags:
 *   - name: Tickets
 *     description: Ticket management endpoints
 */

/**
 * @swagger
 * /api/tickets/my-tickets:
 *   get:
 *     summary: Get user tickets
 *     tags: [Tickets]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of user's tickets
 */

/**
 * @swagger
 * /api/tickets:
 *   post:
 *     summary: Create ticket
 *     tags: [Tickets]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       201:
 *         description: Ticket created successfully
 */

/**
 * @swagger
 * /api/tickets/{id}:
 *   get:
 *     summary: Get ticket by ID
 *     tags: [Tickets]
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
 *         description: Ticket details
 */

/**
 * @swagger
 * /api/{id}/messages:
 *   post:
 *     summary: Add message to ticket by ticket ID
 *     tags: [Tickets]
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
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - message
 *             properties:
 *               message:
 *                 type: string
 *               attachments:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *     responses:
 *       200:
 *         description: Message added successfully
 */

/**
 * @swagger
 * /api/{id}/status:
 *   patch:
 *     summary: Update ticket status by ID
 *     tags: [Tickets]
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
 *                 enum: [open, in-progress, resolved, closed]
 *     responses:
 *       200:
 *         description: Ticket status updated successfully
 */

/**
 * @swagger
 * /api/{id}/assign:
 *   patch:
 *     summary: (Admin) Assigning admin to tickets by ID
 *     tags: [Tickets]
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
 *               - adminId
 *             properties:
 *               adminId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin assigned to ticket successfully
 *       403:
 *         description: Admin access required
 */
