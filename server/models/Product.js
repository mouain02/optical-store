import mongoose from "mongoose";

const imageSchema = new mongoose.Schema(
  {
    path: {
      type: String,
      required: true,
    },

    publicId: {
      type: String,
    },

    alt: String,

    order: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

const variantSchema = new mongoose.Schema(
  {
    color: String,
    size: String,
    stock: { type: Number, default: 0 },
    sku: String,
  },
  { _id: true }
);

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
    category: {
      type: String,
      enum: [
        "prescription",
        "sunglasses",
        "contact-lenses",
        "blue-light",
        "kids",
        "accessories",
      ],
      required: true,
    },
    images: [imageSchema],
    price: { type: Number, required: true, min: 0 },
    discountPrice: { type: Number, default: 0, min: 0 },
    stock: { type: Number, default: 0, min: 0 },
    sku: String,
    gender: {
      type: String,
      enum: ["men", "women", "unisex", "kids"],
      default: "unisex",
    },
    frameShape: String,
    frameMaterial: String,
    colors: [String],
    sizes: [String],
    variants: [variantSchema],
    ratings: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    isActive: { type: Boolean, default: true },
    requiresPrescription: { type: Boolean, default: false },
    supportsLensCustomization: { type: Boolean, default: false },
  },
  { timestamps: true }
);

productSchema.index({ category: 1, brand: 1, price: 1 });

const Product = mongoose.model("Product", productSchema);
export default Product;
