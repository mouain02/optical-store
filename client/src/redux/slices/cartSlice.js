import { createSlice } from "@reduxjs/toolkit";
import storeConfig from "../../config/storeConfig";
import { getEffectivePrice, calculateLensPrice } from "../../utils/helpers";

const loadCart = () => {
  try {
    return JSON.parse(localStorage.getItem("cart") || "[]");
  } catch {
    return [];
  }
};

const saveCart = (items) => localStorage.setItem("cart", JSON.stringify(items));

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: loadCart(),
    coupon: null,
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, variant, lensOptions, prescription } = action.payload;
      const lensPrice = lensOptions
        ? calculateLensPrice(lensOptions.type, lensOptions.treatments)
        : 0;
      const price = getEffectivePrice(product) + lensPrice;
      const key = `${product._id}-${variant?.color || ""}-${variant?.size || ""}-${lensOptions?.type || ""}`;

      const existing = state.items.find((i) => i.key === key);
      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({
          key,
          product,
          quantity,
          price,
          variant,
          lensOptions: lensOptions ? { ...lensOptions, lensPrice } : null,
          prescription,
        });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.key !== action.payload);
      saveCart(state.items);
    },
    updateQuantity: (state, action) => {
      const item = state.items.find((i) => i.key === action.payload.key);
      if (item) {
        item.quantity = Math.max(1, action.payload.quantity);
        saveCart(state.items);
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      saveCart([]);
    },
    setCoupon: (state, action) => {
      state.coupon = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, setCoupon } = cartSlice.actions;

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

export const selectCartShipping = (state) => {
  const subtotal = selectCartSubtotal(state);
  return subtotal >= storeConfig.shipping.freeThreshold ? 0 : storeConfig.shipping.flatRate;
};

export const selectCartDiscount = (state) => {
  const coupon = state.cart.coupon;
  if (!coupon) return 0;
  const subtotal = selectCartSubtotal(state);
  return coupon.discountType === "percentage"
    ? (subtotal * coupon.discount) / 100
    : coupon.discount;
};

export const selectCartTotal = (state) => {
  const subtotal = selectCartSubtotal(state);
  const shipping = selectCartShipping(state);
  const discount = selectCartDiscount(state);
  return Math.max(0, subtotal - discount + shipping);
};

export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, i) => sum + i.quantity, 0);

export default cartSlice.reducer;
