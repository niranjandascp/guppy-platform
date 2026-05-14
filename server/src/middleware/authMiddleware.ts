import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  userId: string;
  role: string;
}

export const protect = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const token =
    req.cookies?.accessToken ||
    req.headers.authorization?.split(" ");

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
    return;
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET as string
    ) as JwtPayload;
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
