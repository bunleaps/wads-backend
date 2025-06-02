import express from "express";
import { auth } from "../middlewares/auth.js";
import {
  createPurchase,
  getUserPurchases,
  getAllUsers,
} from "../controllers/purchaseController.js";

const router = express.Router();

router.post("/", createPurchase);
router.get("/user", auth, getUserPurchases);
router.get("/users_list", getAllUsers);

export default router;
