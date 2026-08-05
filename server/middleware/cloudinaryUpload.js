import fs from "fs";
import path from "path";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { fileURLToPath } from "url";
import cloudinary from "../config/cloudinary.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsRoot = path.join(__dirname, "..", "uploads", "products");

const ensureDir = (dir) => fs.mkdirSync(dir, { recursive: true });

const localStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const slug = req.params.slug || req.body.slug || "temp";
    const dir = path.join(uploadsRoot, slug);
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const isCloudinaryConfigured = Boolean(
  process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
);

const storage = isCloudinaryConfigured
  ? new CloudinaryStorage({
      cloudinary,
      params: {
        folder: "optical-store/products",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
      },
    })
  : localStorage;

const upload = multer({ storage }).array("images", 10);

export default (req, res, next) => {
  upload(req, res, (err) => {
    if (err) return next(err);

    next();
  });
};