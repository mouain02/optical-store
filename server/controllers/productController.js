import slugify from "slugify";
import fs from "fs";
import path from "path";
import Product from "../models/Product.js";
import Review from "../models/Review.js";
import asyncHandler from "../utils/asyncHandler.js";

const buildFilter = (query) => {
  const filter = { isActive: true };
  if (query.category) filter.category = query.category;
  if (query.brand) filter.brand = query.brand;
  if (query.gender) filter.gender = query.gender;
  if (query.frameShape) filter.frameShape = query.frameShape;
  if (query.frameMaterial) filter.frameMaterial = query.frameMaterial;
  if (query.color) filter.colors = query.color;
  if (query.size) filter.sizes = query.size;
  if (query.inStock === "true") filter.stock = { $gt: 0 };

  if (query.minPrice || query.maxPrice) {
    filter.price = {};
    if (query.minPrice) filter.price.$gte = Number(query.minPrice);
    if (query.maxPrice) filter.price.$lte = Number(query.maxPrice);
  }

  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { description: { $regex: query.search, $options: "i" } },
    ];
  }
  return filter;
};

const buildSort = (sort) => {
  switch (sort) {
    case "price_asc":
      return { price: 1 };
    case "price_desc":
      return { price: -1 };
    case "rating":
      return { "ratings.average": -1 };
    default:
      return { createdAt: -1 };
  }
};

export const getProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 12;
  const filter = buildFilter(req.query);
  const sort = buildSort(req.query.sort);

  const total = await Product.countDocuments(filter);
  const products = await Product.find(filter)
    .populate("brand", "name slug")
    .sort(sort)
    .skip((page - 1) * limit)
    .limit(20)
    .lean();

  res.json({ products, page, pages: Math.ceil(total / limit), total });
});

export const getProductBySlug = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug, isActive: true })
    .populate("brand", "name slug logo");

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const reviews = await Review.find({ product: product._id, approved: true })
    .populate("user", "name")
    .sort({ createdAt: -1 })
    .limit(10);

  const related = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
    isActive: true,
  })
    .populate("brand", "name slug")
    .limit(4);

  res.json({ product, reviews, related });
});

export const createProduct = asyncHandler(async (req, res) => {
  let slug = slugify(req.body.name, { lower: true, strict: true });

  // Handle duplicate slugs by appending a numeric suffix
  const existingProduct = await Product.findOne({ slug });
  if (existingProduct) {
    let counter = 1;
    while (await Product.findOne({ slug: `${slug}-${counter}` })) {
      counter++;
    }
    slug = `${slug}-${counter}`;
  }

  const product = await Product.create({ ...req.body, slug });
  res.status(201).json(product);
});

export const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  if (req.body.name) {
    req.body.slug = slugify(req.body.name, { lower: true, strict: true });
  }
  Object.assign(product, req.body);
  await product.save();
  res.json(product);
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }
  product.isActive = false;
  await product.save();
  res.json({ message: "Product removed" });
});

export const uploadImages = asyncHandler(async (req, res) => {
  console.log("PARAMS:", req.params);
  console.log("BODY:", req.body);
  console.log("FILES:", req.files);

  const product = await Product.findOne({ slug: req.params.slug });

  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const newImages = (req.files || []).map((file, i) => ({
    path: `/uploads/products/${req.params.slug}/${file.filename}`,
    alt: req.body.alt || product.name,
    order: product.images.length + i,
  }));

  console.log("NEW IMAGES:", newImages);

  product.images.push(...newImages);

  await product.save();

  res.status(201).json(product.images);
});

export const reorderImages = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const orderMap = new Map(req.body.images.map((img) => [img.id, img.order]));
  product.images.forEach((img) => {
    if (orderMap.has(img._id.toString())) {
      img.order = orderMap.get(img._id.toString());
    }
  });
  product.images.sort((a, b) => a.order - b.order);
  await product.save();
  res.json(product.images);
});

export const deleteImage = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const image = product.images.id(req.params.imageId);
  if (!image) {
    res.status(404);
    throw new Error("Image not found");
  }

  const filePath = path.join(process.cwd(), image.path.replace(/^\//, ""));
  if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

  product.images.pull(req.params.imageId);
  await product.save();
  res.json({ message: "Image deleted" });
});

export const replaceImage = asyncHandler(async (req, res) => {
  const product = await Product.findOne({ slug: req.params.slug });
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const image = product.images.id(req.params.imageId);
  if (!image) {
    res.status(404);
    throw new Error("Image not found");
  }

  const oldPath = path.join(process.cwd(), image.path.replace(/^\//, ""));
  if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);

  if (req.file) {
    image.path = `/uploads/products/${req.params.slug}/${req.file.filename}`;
    image.alt = req.body.alt || image.alt;
    await product.save();
  }

  res.json(image);
});

export const getAdminProducts = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate("brand", "name")
    .sort({ createdAt: -1 });
  res.json(products);
});

export default {
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
};
