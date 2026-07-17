import Brand from "../models/Brand.js";
import slugify from "slugify";
import asyncHandler from "../utils/asyncHandler.js";

export const getBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find({ isActive: true }).sort({ name: 1 });
  res.json(brands);
});

export const createBrand = asyncHandler(async (req, res) => {
  const slug = slugify(req.body.name, { lower: true, strict: true });
  const brand = await Brand.create({ ...req.body, slug });
  res.status(201).json(brand);
});

export const updateBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!brand) {
    res.status(404);
    throw new Error("Brand not found");
  }
  res.json(brand);
});

export const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);
  if (!brand) {
    res.status(404);
    throw new Error("Brand not found");
  }
  brand.isActive = false;
  await brand.save();
  res.json({ message: "Brand removed" });
});

export default { getBrands, createBrand, updateBrand, deleteBrand };
