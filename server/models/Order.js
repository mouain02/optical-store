import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    name: String,
    image: String,
    quantity: { type: Number, required: true, min: 1 },
    price: { type: Number, required: true },
    variant: { color: String, size: String },
    lensOptions: {
      type: { type: String, enum: ["single", "progressive", "bifocal"] },
      treatments: [String],
      lensPrice: { type: Number, default: 0 },
    },
    prescription: { type: mongoose.Schema.Types.ObjectId, ref: "Prescription" },
  },
  { _id: true }
);

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    orderNumber: { type: String, required: true, unique: true },
    items: [orderItemSchema],
    subtotal: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    shipping: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
    coupon: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
    status: {
      type: String,
      enum: [
        "pending",
        "prescription_verification",
        "processing",
        "ready",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "pending",
    },
    statusHistory: [
      {
        status: String,
        date: { type: Date, default: Date.now },
        note: String,
      },
    ],
    shippingAddress: {
      name: String,
      phone: String,
      street: String,
      city: String,
      postalCode: String,
      country: String,
    },
    paymentMethod: { type: String, enum: ["cod", "online"], default: "cod" },
    paymentStatus: { type: String, enum: ["pending", "paid"], default: "pending" },
    customerNote: String,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
