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
