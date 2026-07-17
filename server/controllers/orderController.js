import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";
import Prescription from "../models/Prescription.js";
import storeConfig from "../config/storeConfig.js";
import asyncHandler from "../utils/asyncHandler.js";
import { calculateLensPrice, getEffectivePrice } from "../utils/lensPricing.js";

const generateOrderNumber = () =>
  `ORD-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

export const createOrder = asyncHandler(async (req, res) => {
  const { items, shippingAddress, paymentMethod, couponCode, customerNote } = req.body;

  if (!items?.length) {
    res.status(400);
    throw new Error("No order items");
  }

  let subtotal = 0;
  const orderItems = [];

  for (const item of items) {
    const product = await Product.findById(item.product);
    if (!product || !product.isActive) {
      res.status(404);
      throw new Error(`Product not found: ${item.product}`);
    }
    if (product.stock < item.quantity) {
      res.status(400);
      throw new Error(`Insufficient stock for ${product.name}`);
    }

    const framePrice = getEffectivePrice(product);
    const lensPrice = item.lensOptions
      ? calculateLensPrice(item.lensOptions.type, item.lensOptions.treatments)
      : 0;
    const unitPrice = framePrice + lensPrice;

    if (item.prescription) {
      const rx = await Prescription.findOne({
        _id: item.prescription,
        user: req.user._id,
      });
      if (!rx) {
        res.status(400);
        throw new Error("Invalid prescription");
      }
    }

    orderItems.push({
      product: product._id,
      name: product.name,
      image: product.images[0]?.path || "",
      quantity: item.quantity,
      price: unitPrice,
      variant: item.variant,
      lensOptions: item.lensOptions
        ? { ...item.lensOptions, lensPrice }
        : undefined,
      prescription: item.prescription,
    });

    subtotal += unitPrice * item.quantity;
    product.stock -= item.quantity;
    await product.save();
  }

  let discount = 0;
  let coupon = null;
  if (couponCode) {
    coupon = await Coupon.findOne({
      code: couponCode.toUpperCase(),
      active: true,
    });
    if (!coupon || (coupon.expiration && coupon.expiration < new Date())) {
      res.status(400);
      throw new Error("Invalid or expired coupon");
    }
    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      res.status(400);
      throw new Error("Coupon usage limit reached");
    }
    if (subtotal < coupon.minOrderAmount) {
      res.status(400);
      throw new Error(`Minimum order amount is ${coupon.minOrderAmount}`);
    }
    discount =
      coupon.discountType === "percentage"
        ? (subtotal * coupon.discount) / 100
        : coupon.discount;
    coupon.usedCount += 1;
    await coupon.save();
  }

  const shipping =
    subtotal >= storeConfig.shipping.freeThreshold ? 0 : storeConfig.shipping.flatRate;
  const totalPrice = Math.max(0, subtotal - discount + shipping);

  const hasPrescription = orderItems.some((i) => i.prescription);
  const initialStatus = hasPrescription ? "prescription_verification" : "pending";

  const order = await Order.create({
    user: req.user._id,
    orderNumber: generateOrderNumber(),
    items: orderItems,
    subtotal,
    discount,
    shipping,
    totalPrice,
    coupon: coupon?._id,
    status: initialStatus,
    statusHistory: [{ status: initialStatus, note: "Order placed" }],
    shippingAddress,
    paymentMethod: paymentMethod || "cod",
    customerNote,
  });

  res.status(201).json(order);
});

export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("items.product", "name slug images")
    .sort({ createdAt: -1 });
  res.json(orders);
});

export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email phone")
    .populate("items.product", "name slug images")
    .populate("items.prescription");

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  if (
    order.user._id.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    res.status(403);
    throw new Error("Not authorized");
  }

  res.json(order);
});

export const getAdminOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find()
    .populate("user", "name email phone")
    .sort({ createdAt: -1 });
  res.json(orders);
});

export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  order.status = req.body.status;
  order.statusHistory.push({
    status: req.body.status,
    note: req.body.note || "",
  });
  await order.save();
  res.json(order);
});

export default {
  createOrder,
  getMyOrders,
  getOrderById,
  getAdminOrders,
  updateOrderStatus,
};
