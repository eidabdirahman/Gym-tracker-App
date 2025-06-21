// src/middleware/authMiddleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import User from "../models/Users";

interface AuthRequest extends Request {
  user?: any;
}


const protect = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    let token;

    // Check Authorization header
    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check token cookie if header is missing
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    if (!token) {
      res.status(401).json({ error: "No token provided" });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      res.status(401).json({ error: "User not found" });
      return;
    }

    req.user = user;
    next();
  } catch (err) {
    res.status(401).json({ error: "Invalid token" });
  }
};


// Middleware to check if the user is admin
 const admin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && (req.user.role === "admin" || req.user.role === "superadmin")) {
    next();
  } else {
    res.status(403).json({ error: "Admin access only" });
  }
};

// Middleware to check if the user is a superadmin
 const superadmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user && req.user.role === "superadmin") {
    next();
  } else {
    res.status(403).json({ error: "Superadmin access only" });
  }
};

export { 
    protect, 
    admin, 
    superadmin 
};