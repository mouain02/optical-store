import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import User from "../models/User.js";
import Brand from "../models/Brand.js";
import Product from "../models/Product.js";
import Coupon from "../models/Coupon.js";
import connectDB from "../config/db.js";

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../.env"), override: true });

const brands = [
  { name: "Ray-Ban", slug: "ray-ban" },
  { name: "Oakley", slug: "oakley" },
  { name: "Persol", slug: "persol" },
  { name: "Gucci", slug: "gucci" },
  { name: "Tom Ford", slug: "tom-ford" },
];

const products = [
  {
    name: "Aviator Classic",
    slug: "aviator-classic",
    description:
      "Timeless aviator sunglasses with premium metal frame and polarized lenses. A statement piece for every season.",
    category: "sunglasses",
    price: 320,
    discountPrice: 280,
    stock: 25,
    sku: "RB-AV-001",
    gender: "unisex",
    frameShape: "aviator",
    frameMaterial: "metal",
    colors: ["gold", "silver", "black"],
    sizes: ["standard"],
    requiresPrescription: false,
    supportsLensCustomization: false,
    images: [{ path: "/uploads/products/aviator-classic/front.jpg", alt: "Aviator Classic", order: 0 }],
  },
  {
    name: "Wayfarer Original",
    slug: "wayfarer-original",
    description:
      "Iconic wayfarer design with acetate frame. Bold, versatile, and unmistakably classic.",
    category: "sunglasses",
    price: 290,
    stock: 30,
    sku: "RB-WF-002",
    gender: "unisex",
    frameShape: "wayfarer",
    frameMaterial: "acetate",
    colors: ["black", "tortoise"],
    sizes: ["standard"],
    images: [{ path: "/uploads/products/wayfarer-original/front.jpg", alt: "Wayfarer Original", order: 0 }],
  },
  {
    name: "Clarity Pro",
    slug: "clarity-pro",
    description:
      "Premium prescription frames with lightweight titanium construction. Designed for all-day comfort.",
    category: "prescription",
    price: 250,
    stock: 20,
    sku: "CL-PR-003",
    gender: "men",
    frameShape: "rectangle",
    frameMaterial: "titanium",
    colors: ["gunmetal", "matte black"],
    sizes: ["medium", "large"],
    requiresPrescription: true,
    supportsLensCustomization: true,
    images: [{ path: "/uploads/products/clarity-pro/front.jpg", alt: "Clarity Pro", order: 0 }],
  },
  {
    name: "Blue Shield",
    slug: "blue-shield",
    description:
      "Blue light filtering glasses for digital professionals. Reduce eye strain without compromising style.",
    category: "blue-light",
    price: 180,
    stock: 40,
    sku: "BS-004",
    gender: "unisex",
    frameShape: "round",
    frameMaterial: "acetate",
    colors: ["clear", "black"],
    sizes: ["standard"],
    supportsLensCustomization: true,
    images: [{ path: "/uploads/products/blue-shield/front.jpg", alt: "Blue Shield", order: 0 }],
  },
  {
    name: "Little Explorer",
    slug: "little-explorer",
    description:
      "Durable, flexible kids frames with impact-resistant lenses. Perfect for active young adventurers.",
    category: "kids",
    price: 120,
    stock: 35,
    sku: "KE-005",
    gender: "kids",
    frameShape: "round",
    frameMaterial: "tr90",
    colors: ["blue", "pink", "green"],
    sizes: ["small"],
    images: [{ path: "/uploads/products/little-explorer/front.jpg", alt: "Little Explorer", order: 0 }],
  },
  {
    name: "Elegance Cat Eye",
    slug: "elegance-cat-eye",
    description:
      "Sophisticated cat-eye frames with subtle gold accents. A refined choice for the modern woman.",
    category: "prescription",
    price: 310,
    discountPrice: 270,
    stock: 15,
    sku: "EC-006",
    gender: "women",
    frameShape: "cat-eye",
    frameMaterial: "acetate",
    colors: ["burgundy", "black"],
    sizes: ["medium"],
    requiresPrescription: true,
    supportsLensCustomization: true,
    images: [{ path: "/uploads/products/elegance-cat-eye/front.jpg", alt: "Elegance Cat Eye", order: 0 }],
  },
];

const seed = async () => {
  await connectDB();

  await Promise.all([
    User.deleteMany(),
    Brand.deleteMany(),
    Product.deleteMany(),
    Coupon.deleteMany(),
  ]);

  const admin = await User.create({
    name: "Admin",
    email: "admin@optical.com",
    password: "admin123",
    role: "admin",
    phone: "+216 12 345 678",
  });

  const customer = await User.create({
    name: "Demo Customer",
    email: "customer@optical.com",
    password: "customer123",
    phone: "+216 98 765 432",
  });

  const createdBrands = await Brand.insertMany(brands);
  const brandMap = Object.fromEntries(createdBrands.map((b) => [b.slug, b._id]));

  const seededProducts = products.map((p, i) => ({
    ...p,
    brand: createdBrands[i % createdBrands.length]._id,
  }));

  await Product.insertMany(seededProducts);

  await Coupon.create({
    code: "WELCOME10",
    discountType: "percentage",
    discount: 10,
    expiration: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    active: true,
    usageLimit: 100,
    minOrderAmount: 50,
  });

  console.log("Seed completed!");
  console.log(`Brands: ${createdBrands.length}, Products: ${seededProducts.length}`);

  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
