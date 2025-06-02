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
