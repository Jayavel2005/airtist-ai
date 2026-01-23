import {Router} from "express";
import FormData from "form-data";
import axios from "axios";
import {config} from "../config/env.js";
import * as fs from "node:fs";
import {generateImage, deleteImage} from "../controllers/image.controller.js";

export const imgRouter = Router();

/*
GET      /health
POST     /api/v1/images/generate
GET      /api/v1/images
DELETE   /api/v1/images/:id
*/

// imgRouter.get("/", (req, res)=>{
//     res.status(200).json({
//         success : true,
//         message : "/api/v1/images is fine."
//     })
// })

imgRouter.post("/generate",generateImage);

imgRouter.delete("/:id", deleteImage);
