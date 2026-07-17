import express from "express";
import {
  getProductReviews,
  createReview,
  getAdminReviews,
  approveReview,
  deleteReview,
} from "../controllers/reviewController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import { uploadReviewImages } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/product/:productId", getProductReviews);
router.post("/product/:productId", protect, uploadReviewImages, createReview);
router.get("/admin/all", protect, admin, getAdminReviews);
router.patch("/:id/approve", protect, admin, approveReview);
router.delete("/:id", protect, admin, deleteReview);

export default router;
