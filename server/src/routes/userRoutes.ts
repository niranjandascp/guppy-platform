import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  getAllUsers,
} from "../controllers/userController.ts";
import { protect, adminOnly } from "../middleware/authMiddleware.ts";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/", protect, adminOnly, getAllUsers);

export default router;