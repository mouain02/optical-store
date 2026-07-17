import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const uploadsRoot = path.join(__dirname, "..", "uploads");

const ensureDir = (dir) => {
  fs.mkdirSync(dir, { recursive: true });
};

const allowedImageTypes = /jpeg|jpg|png|webp/;
const allowedDocTypes = /jpeg|jpg|png|webp|pdf/;

const fileFilter = (allowed) => (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase().slice(1);
  const ok = allowed.test(ext) && allowed.test(file.mimetype);
  cb(ok ? null : new Error("Invalid file type"), ok);
};

const productStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const slug = req.params.slug || req.body.slug || "temp";
    const dir = path.join(uploadsRoot, "products", slug);
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}-${file.fieldname}${ext}`);
  },
});

const storeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const sub = file.fieldname === "banner" ? "banners" : "";
    const dir = path.join(uploadsRoot, "store", sub);
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = file.fieldname === "banner" ? `banner-${Date.now()}` : file.fieldname;
    cb(null, `${name}${ext}`);
  },
});

const prescriptionStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(uploadsRoot, "prescriptions", req.user._id.toString());
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

const reviewStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = path.join(uploadsRoot, "reviews", req.params.productId || "temp");
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`);
  },
});

export const uploadProductImages = multer({
  storage: productStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter(allowedImageTypes),
}).array("images", 10);

export const uploadStoreAssets = multer({
  storage: storeStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter(allowedImageTypes),
}).fields([
  { name: "logo", maxCount: 1 },
  { name: "favicon", maxCount: 1 },
  { name: "banner", maxCount: 5 },
]);

export const uploadPrescription = multer({
  storage: prescriptionStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: fileFilter(allowedDocTypes),
}).single("file");

export const uploadReviewImages = multer({
  storage: reviewStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter(allowedImageTypes),
}).array("images", 5);

export const uploadsRootPath = uploadsRoot;

export default {
  uploadProductImages,
  uploadStoreAssets,
  uploadPrescription,
  uploadReviewImages,
};
