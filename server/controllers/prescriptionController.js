import Prescription from "../models/Prescription.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getPrescriptions = asyncHandler(async (req, res) => {
  const prescriptions = await Prescription.find({ user: req.user._id }).sort({
    createdAt: -1,
  });
  res.json(prescriptions);
});

export const createPrescription = asyncHandler(async (req, res) => {
  const data = {
    user: req.user._id,
    label: req.body.label || "My Prescription",
    rightEye: req.body.rightEye,
    leftEye: req.body.leftEye,
    pd: req.body.pd,
  };

  if (req.file) {
    data.uploadedFile = {
      path: `/uploads/prescriptions/${req.user._id}/${req.file.filename}`,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
    };
  }

  const prescription = await Prescription.create(data);
  res.status(201).json(prescription);
});

export const updatePrescription = asyncHandler(async (req, res) => {
  const prescription = await Prescription.findOne({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!prescription) {
    res.status(404);
    throw new Error("Prescription not found");
  }
  Object.assign(prescription, req.body);
  if (req.file) {
    prescription.uploadedFile = {
      path: `/uploads/prescriptions/${req.user._id}/${req.file.filename}`,
      originalName: req.file.originalname,
      mimeType: req.file.mimetype,
    };
  }
  await prescription.save();
  res.json(prescription);
});

export const deletePrescription = asyncHandler(async (req, res) => {
  const prescription = await Prescription.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  if (!prescription) {
    res.status(404);
    throw new Error("Prescription not found");
  }
  res.json({ message: "Prescription deleted" });
});

export default {
  getPrescriptions,
  createPrescription,
  updatePrescription,
  deletePrescription,
};
