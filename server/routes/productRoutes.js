import express from "express";
import {
  getProducts,
  getProductBySlug,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadImages,
  reorderImages,
  deleteImage,
  replaceImage,
  getAdminProducts,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
import {
  uploadProductImages,
} from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/", getProducts);
router.get("/admin/all", protect, admin, getAdminProducts);
router.get("/:slug", getProductBySlug);

router.post("/", protect, admin, createProduct);
router.put("/:id", protect, admin, updateProduct);
router.delete("/:id", protect, admin, deleteProduct);

router.post("/:slug/images", protect, admin, uploadProductImages, uploadImages);
router.put("/:id/images/reorder", protect, admin, reorderImages);
router.delete("/:id/images/:imageId", protect, admin, deleteImage);
router.put(
  "/:slug/images/:imageId",
  protect,
  admin,
  uploadProductImages,
  replaceImage
);

export default router;
