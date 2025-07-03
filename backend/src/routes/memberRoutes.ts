import express from "express";
import {
  createMember,
  getAllMembers,
  getMemberById,
  updateMember,
  deleteMember,
  importMembers,
} from "../controllers/memberController";

import { protect, admin, superadmin } from "../middlewares/authenticate";

const router = express.Router();

router.route("/")
  .get(protect, admin, getAllMembers)
  .post(protect, admin, createMember);

  // Import members from an Excel file
  router.route("/import")
  .post(protect, admin, importMembers);
  

router.route("/:id")
  .get(protect, superadmin, admin, getMemberById)
  .put(protect, admin, updateMember)
  .delete(protect, admin, deleteMember);

export default router;
