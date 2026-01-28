import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import authRouter from "./routes/auth.route.js";
import { imgRouter } from "./routes/imageRouter.js";
import { authMiddleware } from "./middlewares/auth.middleware.js";

const app = express();

// Parse JSON
app.use(express.json());

// Parse cookies
app.use(cookieParser());

// CORS (required for cookies)
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// ✅ AUTH ROUTES (PUBLIC)
app.use("/api/v1/auth", authRouter);

// ✅ PROTECTED IMAGE ROUTES
app.use("/api/v1/images", authMiddleware, imgRouter);

// ✅ COOKIE TEST ROUTE (BACKEND ONLY)
app.get("/test-cookie", (req, res) => {
  console.log("Cookies received:", req.cookies);
  res.json(req.cookies);
});

// Health check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running successfully.",
  });
});

export default app;
