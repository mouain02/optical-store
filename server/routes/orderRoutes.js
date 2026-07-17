import express from "express";
import {
  createOrder,
  getMyOrders,
  getOrderById,
  getAdminOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createOrder);
router.get("/my", protect, getMyOrders);
router.get("/admin/all", protect, admin, getAdminOrders);
router.get("/:id", protect, getOrderById);
router.patch("/:id/status", protect, admin, updateOrderStatus);

export default router;
