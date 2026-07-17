import Coupon from "../models/Coupon.js";
import asyncHandler from "../utils/asyncHandler.js";

export const validateCoupon = asyncHandler(async (req, res) => {
  const { code, subtotal } = req.body;
  const coupon = await Coupon.findOne({ code: code.toUpperCase(), active: true });

  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }
  if (coupon.expiration && coupon.expiration < new Date()) {
    res.status(400);
    throw new Error("Coupon expired");
  }
  if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
    res.status(400);
    throw new Error("Coupon usage limit reached");
  }
  if (subtotal < coupon.minOrderAmount) {
    res.status(400);
    throw new Error(`Minimum order amount is ${coupon.minOrderAmount}`);
  }

  const discount =
    coupon.discountType === "percentage"
      ? (subtotal * coupon.discount) / 100
      : coupon.discount;

  res.json({ coupon, discount });
});

export const getCoupons = asyncHandler(async (req, res) => {
  const coupons = await Coupon.find().sort({ createdAt: -1 });
  res.json(coupons);
});

export const createCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.create(req.body);
  res.status(201).json(coupon);
});

export const updateCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }
  res.json(coupon);
});

export const deleteCoupon = asyncHandler(async (req, res) => {
  const coupon = await Coupon.findByIdAndDelete(req.params.id);
  if (!coupon) {
    res.status(404);
    throw new Error("Coupon not found");
  }
  res.json({ message: "Coupon deleted" });
});

export default {
  validateCoupon,
  getCoupons,
  createCoupon,
  updateCoupon,
  deleteCoupon,
};
