import { verifyUser } from "../utils/jwt.util.js";
import { User } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
    try {
        const { token } = req.cookies || {};

        console.log(`token ${token.token}`);

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Not authenticated",
            });
        }

        const decoded = verifyUser(token);

        const user = await User.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        req.user = user;
        return next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
