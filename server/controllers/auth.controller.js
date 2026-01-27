import { encryptPassword, passwordMatch } from "../utils/bcrypt.util.js";
import { User } from "../models/user.model.js";
import { generateToken } from "../utils/jwt.util.js";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        const hashedPassword = await encryptPassword(password);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
        });

        const userObj = newUser.toObject();
        delete userObj.password;

        res.status(201).json({
            success: true,
            user: userObj,
        });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password");
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const isMatch = await passwordMatch(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials",
            });
        }

        const token = generateToken(user);

        res.cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });

        const userObj = user.toObject();
        delete userObj.password;

        return res.status(200).json({
            success: true,
            user: userObj,
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
};
