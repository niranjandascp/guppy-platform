import { Request, Response } from "express";
import Order from "../models/Order";

// CREATE ORDER
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log("req.body:>>>>>>>>>", req);
    const order = await Order.create(req.body);
    res.status(201).json(order);
    console.log("order>>>>>>", order);
  } catch (error) {
    res.status(500).json({ message: "Failed to create order" });
  }
};

// GET ALL ORDERS
export const getOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch orders" });
  }
};

// GET ORDER BY ID
export const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch order" });
  }
};

// UPDATE ORDER STATUS
export const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!order) {
      res.status(404).json({ message: "Order not found" });
      return;
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Failed to update order" });
  }
};