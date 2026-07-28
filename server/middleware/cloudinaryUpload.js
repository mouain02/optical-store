import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "optical-store/products",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const upload = multer({ storage }).array("images", 10);

export default (req, res, next) => {
  upload(req, res, (err) => {
    console.log("MULTER ERROR:", err);
    console.log("FILES:", req.files);

    if (err) return next(err);

    next();
  });
};