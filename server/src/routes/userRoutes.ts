import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  addAddress,
  getAllUsers,
  deleteUser,
} from "../controllers/userController";
import { protect, adminOnly } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);
router.post("/address", protect, addAddress);
router.get("/", protect, adminOnly, getAllUsers);
router.delete("/:id", protect, adminOnly, deleteUser);

export default router;
