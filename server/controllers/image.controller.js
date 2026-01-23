import FormData from "form-data";
import axios from "axios";
import {generateImageService} from "../services/image.service.js";
import {Images} from "../models/imageModel.js";
export const generateImage =async (req, res, next) =>{
    const {prompt} = req.body;

    const form = new FormData();

    form.append("prompt", prompt);

    const imageBuffer = await generateImageService(form);

    const base64imgStr = Buffer.from(imageBuffer).toString("base64");

    const newImage = Images({
        prompt,
        imgUrl : base64imgStr,
    });

    await newImage.save();

    res.status(200).json({
        success : true,
        data : newImage,
    });
}