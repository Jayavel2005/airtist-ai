import express from "express";
import { signup, login, logout,getMe } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const authRouter = express.Router();

authRouter.post("/login", login);
authRouter.post("/signup", signup);
authRouter.post("/logout", logout)

// get auth me

authRouter.get("/me", authMiddleware, getMe);
export default authRouter;
