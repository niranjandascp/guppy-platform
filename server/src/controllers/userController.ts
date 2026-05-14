import { Request, Response } from "express";
import User from "../models/User";

// ─────────────────────────────────────────
// CUSTOMER ROUTES
// ─────────────────────────────────────────

// GET MY PROFILE
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

// UPDATE MY PROFILE
export const updateUserProfile = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, avatar, phone } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user?.userId,
      { name, avatar, phone },
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
    res.json({ message: "Address added", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE ADDRESS
export const deleteAddress = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.user?.userId);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.addresses = user.addresses.filter(
      (_: any, index: number) => index !== Number(req.params.index)
    );

    await user.save();
    res.json({ message: "Address removed", addresses: user.addresses });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ─────────────────────────────────────────
// ADMIN ROUTES
// ─────────────────────────────────────────

// GET ALL USERS — with search, filter, pagination
export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      search,
      role,
      isBlocked,
      page = 1,
      limit = 10,
    } = req.query;

    const query: Record<string, unknown> = {};

    // Search by name or email
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    // Filter by role
    if (role && role !== "all") {
      query.role = role;
    }

    // Filter by blocked status
    if (isBlocked === "true") query.isBlocked = true;
    if (isBlocked === "false") query.isBlocked = false;

    const skip = (Number(page) - 1) * Number(limit);

    const users = await User.find(query)
      .select("-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await User.countDocuments(query);

    res.json({
      users,
      total,
      page: Number(page),
      pages: Math.ceil(total / Number(limit)),
    });
  } catch (error) {
    console.error("Get all users error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE USER BY ID
export const getUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE USER ROLE
export const updateUserRole = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { role } = req.body;

    if (!["customer", "admin"].includes(role)) {
      res.status(400).json({ message: "Invalid role" });
      return;
    }

    // Prevent admin from changing their own role
    if (req.params.id === req.user?.userId) {
      res.status(400).json({ message: "Cannot change your own role" });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    ).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ message: `Role updated to ${role}`, user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// BLOCK USER
export const blockUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Prevent admin from blocking themselves
    if (req.params.id === req.user?.userId) {
      res.status(400).json({ message: "Cannot block yourself" });
      return;
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: true },
      { new: true }
    ).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ message: "User blocked", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// UNBLOCK USER
export const unblockUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { isBlocked: false },
      { new: true }
    ).select("-password");

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ message: "User unblocked", user });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE USER
export const deleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Prevent admin from deleting themselves
    if (req.params.id === req.user?.userId) {
      res.status(400).json({ message: "Cannot delete yourself" });
      return;
    }

    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// GET ADMIN STATS
export const getUserStats = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await User.countDocuments({ role: "admin" });
    const totalCustomers = await User.countDocuments({ role: "customer" });
    const totalBlocked = await User.countDocuments({ isBlocked: true });

    // New users this month
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const newThisMonth = await User.countDocuments({
      createdAt: { $gte: startOfMonth },
    });

    res.json({
      totalUsers,
      totalAdmins,
      totalCustomers,
      totalBlocked,
      newThisMonth,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};