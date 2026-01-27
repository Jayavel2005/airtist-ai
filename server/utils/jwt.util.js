import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const generateToken = async (user) => {
    return jwt.sign(
        {
            id: user._id,
            email: user.email,
            username: user.username,
        },
        config.JWT_SECRET,
        {
            expiresIn: config.JWT_EXPIRES_IN || "7d",
        }
    );
};

export const verifyUser = (token) => {
    return jwt.verify(token, config.JWT_SECRET);
};
