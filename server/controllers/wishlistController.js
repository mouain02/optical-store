import User from "../models/User.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate(
    "wishlist",
    "name slug price discountPrice images brand"
  );
  res.json(user.wishlist);
});

export const addToWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  const productId = req.params.productId;
  if (!user.wishlist.includes(productId)) {
    user.wishlist.push(productId);
    await user.save();
  }
  await user.populate("wishlist", "name slug price discountPrice images");
  res.json(user.wishlist);
});

export const removeFromWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.wishlist.pull(req.params.productId);
  await user.save();
  await user.populate("wishlist", "name slug price discountPrice images");
  res.json(user.wishlist);
});

export default { getWishlist, addToWishlist, removeFromWishlist };
