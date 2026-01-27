import { Router } from "express";
import {
    generateImage,
    deleteImage,
    getAllImages,
    downloadImage
} from "../controllers/image.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

export const imgRouter = Router();

// imgRouter.use(authMiddleware);

// imgRouter.get("/", getAllImages);
imgRouter.get("/", authMiddleware, getAllImages);

imgRouter.post("/generate", generateImage);
imgRouter.get("/download/:id", downloadImage);
imgRouter.delete("/:id", deleteImage);
