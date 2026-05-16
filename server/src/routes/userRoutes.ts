import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  addAddress,
  deleteAddress,
  getAllUsers,
  deleteUser,
  getUserStats,
} from "../controllers/userController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.get("/stats", protect, adminOnly, getUserStats);
router.post("/addresses", protect, addAddress);
router.delete("/addresses/:id", protect, deleteAddress);
router.get("/", protect, adminOnly, getAllUsers);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
