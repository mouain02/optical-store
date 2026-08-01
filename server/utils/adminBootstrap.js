// server/utils/adminBootstrap.js
import User from "../models/User.js";

export const ensureDefaultAdmin = async () => {
  const email = process.env.ADMIN_EMAIL || "admin@optical.com";
  const password = process.env.ADMIN_PASSWORD || "admin123";

  let user = await User.findOne({ email });

  if (!user) {
    user = await User.create({
      name: process.env.ADMIN_NAME || "Admin",
      email,
      password,
      role: "admin",
    });
  } else if (user.role !== "admin") {
    user.role = "admin";
    await user.save();
  }

  return user;
};

export default ensureDefaultAdmin;