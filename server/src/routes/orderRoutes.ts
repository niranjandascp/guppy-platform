import express from "express";
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrder,
} from "../controllers/orderController.ts";

const router = express.Router();

router.route("/").post(createOrder).get(getOrders);

router.route("/:id").get(getOrderById).put(updateOrder);


export default router;
