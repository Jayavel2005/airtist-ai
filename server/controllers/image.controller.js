import FormData from "form-data";
import axios from "axios";
import {generateImageService} from "../services/image.service.js";
import {Images} from "../models/imageModel.js";

export const generateImage =async (req, res, next) =>{
    try{
        const { prompt } = req.body;

        const form = new FormData();
        form.append("prompt", prompt);

        const imageBuffer = await generateImageService(form);
        const base64imgStr = Buffer.from(imageBuffer).toString("base64");

        const newImage = Images({
            prompt,
            imgUrl : imageBuffer,
        });
        await newImage.save();

        res.status(200).json({
            success : true,
            data : newImage,
        });
    }catch (e){
        console.log(e.message);
    }
}

export const deleteImage = async (req, res, next) =>{
    try{
        const {id}  = req.params;

        await Images.findByIdAndDelete(id);

        res.status(203).json({
            success : true,
            message : "Image deleted successfully.",
        })

    }catch (e) {
        console.log(e.message)
    }
}