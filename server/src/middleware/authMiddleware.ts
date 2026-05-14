import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";

interface JwtPayload {
  userId: string;
  role: string;
}

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token =
    req.cookies?.accessToken ||
    req.headers.authorization?.split(" ")[1]; // ✅ [1] is the fix

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload;

    const user = await User.findById(decoded.userId).select("isBlocked role");
    if (!user) {
      res.status(401).json({ message: "User not found" });
      return;
    }

    if (user.isBlocked) {
      res.status(403).json({ message: "Your account has been blocked" });
      return;
    }

    req.user = { userId: decoded.userId, role: decoded.role };
    next();
  } catch (error) {
    res.status(401).json({ message: "Token invalid or expired" });
  }
};

export const adminOnly = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (req.user?.role !== "admin") {
    res.status(403).json({ message: "Admin access only" });
    return;
  }
  next();
};