import express from "express";
import {
  createOrder,
  getOrders,
  getMyOrders,
  getOrderById,
  updateOrder,
} from "../controllers/orderController.ts";
import { protect } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, getOrders);
router.route("/my-orders").get(protect, getMyOrders);
router.route("/:id").get(protect, getOrderById).put(protect, updateOrder);


export default router;
