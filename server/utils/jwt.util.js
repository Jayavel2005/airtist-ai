import jwt from "jsonwebtoken";
import {config} from "../config/env.js"

export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id },
    config.JWT_SECRET,
    { expiresIn: config.JWT_EXPIRES_IN || "7d" }
  );
};

export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};
