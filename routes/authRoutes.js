import express from "express";
import {
  signup,
  signin,
  verifyEmail,
  updateProfile,
  deleteProfile,
} from "../controllers/authController.js";
import { auth } from "../middlewares/auth.js"; // Import auth middleware

const router = express.Router();

// Public routes
router.post("/signup", signup);
router.post("/verify-email", verifyEmail);
router.post("/signin", signin);

// Protected routes for authenticated user's own profile
router.put("/profile", auth, updateProfile);
router.delete("/profile", auth, deleteProfile);

export default router;
