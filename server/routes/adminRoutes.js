import express from "express";
import {
  getDashboardStats,
  getCustomers,
  getCustomerById,
  getUsers,
  updateUser,
  deleteUser,
} from "../controllers/adminController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, admin);
router.get("/dashboard", getDashboardStats);
router.get("/customers", getCustomers);
router.get("/customers/:id", getCustomerById);
router.get("/users", getUsers);
router.put("/users/:id", updateUser);
router.delete("/users/:id", deleteUser);

export default router;
