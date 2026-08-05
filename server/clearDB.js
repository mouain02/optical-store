import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "./models/Product.js";
import Brand from "./models/Brand.js";
import Coupon from "./models/Coupon.js";
import User from "./models/User.js";

dotenv.config();

const clearDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  await Product.deleteMany({});
  await Brand.deleteMany({});
  await Coupon.deleteMany({});

  console.log("Database cleaned");

  await mongoose.disconnect();
};

clearDB();