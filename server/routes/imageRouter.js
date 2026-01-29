import { Router } from "express";
import {
  generateImage,
  deleteImage,
  getMyImages,
  downloadImage, refinePrompt,
} from "../controllers/image.controller.js";

export const imgRouter = Router();


imgRouter.post("/generate", generateImage);

imgRouter.get("/", getMyImages);

imgRouter.delete("/:index", deleteImage);

imgRouter.get("/download/:index", downloadImage);

imgRouter.post("/refine-prompt", refinePrompt);