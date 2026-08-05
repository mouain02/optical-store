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
    stock: { 
      type: Number, 
      default: 0 
    },
    sku: String,
  },
  { _id: true }
);


// Ray-Ban style frame information
const frameSchema = new mongoose.Schema(
  {
    shape: String,
    color: String,
    material: String,
    finish: String,
    templeColor: String,
  },
  { _id: false }
);


// Lens information + lens simulator support
const lensSchema = new mongoose.Schema(
  {
    name: String,

    color: String,

    treatment: String,

    category: String,

    polarized: {
      type: Boolean,
      default: false,
    },

    transmission: String,

    description: String,

    simulatorImages: {
      normal: String,
      tinted: String,
    },
  },
  { _id: false }
);


// Product dimensions
const dimensionsSchema = new mongoose.Schema(
  {
    size: String,

    bridge: String,

    lensHeight: String,

    templeLength: String,
  },
  { _id: false }
);



const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: true, 
      trim: true 
    },


    slug: { 
      type: String, 
      required: true, 
      unique: true 
    },


    description: { 
      type: String, 
      required: true 
    },


    brand: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Brand", 
      required: true 
    },


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


    price: { 
      type: Number, 
      required: true, 
      min: 0 
    },


    discountPrice: { 
      type: Number, 
      default: 0, 
      min: 0 
    },


    stock: { 
      type: Number, 
      default: 0, 
      min: 0 
    },


    sku: String,


    // Ray-Ban style reference number
    referenceCode: String,


    gender: {
      type: String,
      enum: [
        "men",
        "women",
        "unisex",
        "kids"
      ],
      default: "unisex",
    },


    // Keep old fields for filtering compatibility
    frameShape: String,

    frameMaterial: String,


    // New detailed frame section
    frame: frameSchema,


    colors: [String],


    sizes: [String],


    variants: [variantSchema],


    // Lens details
    lens: lensSchema,


    // Dimensions displayed in product information
    dimensions: dimensionsSchema,


    ratings: {
      average: { 
        type: Number, 
        default: 0 
      },

      count: { 
        type: Number, 
        default: 0 
      },
    },


    isActive: { 
      type: Boolean, 
      default: true 
    },


    requiresPrescription: { 
      type: Boolean, 
      default: false 
    },


    supportsLensCustomization: { 
      type: Boolean, 
      default: false 
    },


    // Virtual try-on data
    tryOn: {
      enabled: {
        type: Boolean,
        default: false,
      },

      frameOverlay: String,
    },

  },
  { timestamps: true }
);



productSchema.index({ 
  category: 1, 
  brand: 1, 
  price: 1 
});



const Product = mongoose.model("Product", productSchema);

export default Product;