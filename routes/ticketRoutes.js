import express from "express";
import { auth } from "../middlewares/auth.js";
import { adminAuth } from "../middlewares/adminAuth.js";
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
router.post("/", auth, createTicket);
router.get("/:id", auth, getTicketThread);
router.post("/:id/messages", auth, addMessage);
router.patch("/:id/status", adminAuth, updateTicketStatus); // Changed to adminAuth and ensured import

// Admin routes
router.patch("/:id/assign", adminAuth, assignAdmin);

export default router;
