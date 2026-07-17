import Review from "../models/Review.js";
import Product from "../models/Product.js";
import asyncHandler from "../utils/asyncHandler.js";

const updateProductRatings = async (productId) => {
  const reviews = await Review.find({ product: productId, approved: true });
  const count = reviews.length;
  const average =
    count > 0 ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;
  await Product.findByIdAndUpdate(productId, {
    ratings: { average: Math.round(average * 10) / 10, count },
  });
};

export const getProductReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find({
    product: req.params.productId,
    approved: true,
  })
    .populate("user", "name")
    .sort({ createdAt: -1 });
  res.json(reviews);
});

export const createReview = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.productId);
  if (!product) {
    res.status(404);
    throw new Error("Product not found");
  }

  const existing = await Review.findOne({
    product: req.params.productId,
    user: req.user._id,
  });
  if (existing) {
    res.status(400);
    throw new Error("You already reviewed this product");
  }

  const images = (req.files || []).map((file) => ({
    path: `/uploads/reviews/${req.params.productId}/${file.filename}`,
    alt: req.body.alt || "Review image",
  }));

  const review = await Review.create({
    user: req.user._id,
    product: req.params.productId,
    rating: req.body.rating,
    comment: req.body.comment,
    images,
    approved: false,
  });

  res.status(201).json(review);
});

export const getAdminReviews = asyncHandler(async (req, res) => {
  const reviews = await Review.find()
    .populate("user", "name email")
    .populate("product", "name slug")
    .sort({ createdAt: -1 });
  res.json(reviews);
});

export const approveReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }
  review.approved = req.body.approved ?? true;
  await review.save();
  await updateProductRatings(review.product);
  res.json(review);
});

export const deleteReview = asyncHandler(async (req, res) => {
  const review = await Review.findById(req.params.id);
  if (!review) {
    res.status(404);
    throw new Error("Review not found");
  }
  const productId = review.product;
  await review.deleteOne();
  await updateProductRatings(productId);
  res.json({ message: "Review deleted" });
});

export default {
  getProductReviews,
  createReview,
  getAdminReviews,
  approveReview,
  deleteReview,
};
