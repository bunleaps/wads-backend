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
