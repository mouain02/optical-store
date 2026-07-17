import express from "express";
import {
  getPrescriptions,
  createPrescription,
  updatePrescription,
  deletePrescription,
} from "../controllers/prescriptionController.js";
import { protect } from "../middleware/authMiddleware.js";
import { uploadPrescription } from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/", getPrescriptions);
router.post("/", uploadPrescription, createPrescription);
router.put("/:id", uploadPrescription, updatePrescription);
router.delete("/:id", deletePrescription);

export default router;
