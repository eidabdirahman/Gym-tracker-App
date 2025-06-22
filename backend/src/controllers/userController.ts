import mongoose from "mongoose";
import { Request, Response } from "express";
import User from "../models/Users";
import { generateToken } from "../utils/tokenGenerator";

// User authentication (login)

export const authUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      const token = generateToken(user._id.toString());

    res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "none", 
  maxAge: 7 * 24 * 60 * 60 * 1000,
});


      res.status(200).json({ message: "Login successful", user });
    } else {
      res.status(401).json({ error: "Invalid email or password" });
    }
  } catch {
    res.status(500).json({ error: "Login failed" });
  }
};


// Create new user
export const createUser = async (req: Request, res: Response): Promise<void> => {
  const { name, email, password } = req.body;

  try {
    if (!name || !email || !password) {
       res.status(400).json({ error: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists)  res.status(400).json({ error: "User already exists" });

    const user = await User.create({
      name: 'ahmed ali',
      email: 'ahmedali@gmail.com',
      password: '123456',
      role: "admin",
    });

    const token = generateToken(user._id.toString());
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: "User creation failed" });
  }
};

// Logout user

export const logoutUser = (_req: Request, res: Response): void => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "User logged out, " });
};


// Get own profile
export const getUserProfile = async (req: any, res: Response) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    user
      ? res.status(200).json(user)
      : res.status(404).json({ error: "User not found" });
  } catch {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Update own profile
export const updateUserProfile = async (req: any, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) user.password = req.body.password;

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};


// Admin: Get all users
export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
};

// Admin: Get user by ID
export const getUserById = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id).select("-password");
  user
    ? res.status(200).json(user)
    : res.status(404).json({ error: "User not found" });
};

// Admin: Update any user


export const updateUser = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  // Validate the ID format first
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(400).json({ error: "Invalid user ID format" });
    return;
  }

  const { name, email, role, isActive } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.role = role ?? user.role;
    if (typeof isActive === "boolean") {
      user.isActive = isActive;
    }

    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Update failed:", err);
    res.status(500).json({ error: "Failed to update user" });
  }
};


// Superadmin: Delete user
export const deleteUser = async (req: Request, res: Response) => {
  const user = await User.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.status(200).json({ message: "User deleted" });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};
