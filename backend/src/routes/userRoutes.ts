import express from "express";
import {
  authUser,
  logoutUser,
  createUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser,
} from "../controllers/userController";
import { protect, admin, superadmin } from "../middlewares/authenticate";

const router = express.Router();

// Public
router.post("/login", authUser);
router.post("/logout", logoutUser);
router.post("/register", createUser);

// Protected User Routes
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// Admin-only
router.get("/", protect, admin, superadmin, getUsers);
router.get("/:id", protect, admin, getUserById);
router.put("/:id", protect, admin, updateUser);

// Superadmin-only
router.delete("/:id", protect, superadmin, deleteUser);

export default router;
