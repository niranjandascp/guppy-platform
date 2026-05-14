import { Request, Response } from "express";
import User from "../models/User";

// GET PROFILE
export const getUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.user?.userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE PROFILE
export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      { name: req.body.name, avatar: req.body.avatar },
      { new: true }
    ).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ADD ADDRESS
export const addAddress = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.user?.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    user.addresses.push(req.body);
    await user.save();
    res.json(user.addresses);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ALL USERS (admin only)
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE USER (admin only)
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
