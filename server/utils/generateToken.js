import jwt from "jsonwebtoken";

const getJwtSecret = () => process.env.JWT_SECRET || "change-me-in-render";

export const generateToken = (id) =>
  jwt.sign({ id }, getJwtSecret(), { expiresIn: "30d" });

export default generateToken;