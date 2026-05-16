import { Request, Response } from "express";
import Order from "../models/Order";

// CREATE ORDER
export const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const { products, totalPrice, address, paymentMethod } = req.body;
    
    // Map frontend address fields to backend schema
    const orderAddress = {
      fullName: address.fullName,
      phone: address.phone,
      line1: address.addressLine1,
      city: address.city,
      state: address.state,
      pincode: address.postalCode,
      country: address.country
    };

    const order = await Order.create({
      user: req.user?.userId,
      products,
      totalPrice,
      address: orderAddress,
      paymentStatus: paymentMethod === "cod" ? "pending" : "paid"
    });

    res.status(201).json(order);
  } catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({ message: "Failed to create order" });
  }
};

// GET MY ORDERS
export const getMyOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ user: req.user?.userId }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your orders" });
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