import mongoose from "mongoose";

const eyeSchema = new mongoose.Schema(
  {
    sph: String,
    cyl: String,
    axis: String,
  },
  { _id: false }
);

const prescriptionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    label: { type: String, default: "My Prescription" },
    rightEye: eyeSchema,
    leftEye: eyeSchema,
    pd: String,
    uploadedFile: {
      path: String,
      originalName: String,
      mimeType: String,
    },
  },
  { timestamps: true }
);

const Prescription = mongoose.model("Prescription", prescriptionSchema);
export default Prescription;
