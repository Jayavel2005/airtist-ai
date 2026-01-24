import FormData from "form-data";
import {generateImageService} from "../services/image.service.js";
import {Images} from "../models/imageModel.js";
import cloudinary from "../config/cloudinary.js";
export const generateImage =async (req, res, next) =>{
    try{
        const { prompt } = req.body;

        const form = new FormData();
        form.append("prompt", prompt);

        const imageBuffer = await generateImageService(form);
        const base64imgStr = Buffer.from(imageBuffer).toString("base64");

        // Cloudinary Upload.

        const result = await cloudinary.uploader.upload(
            `data:image/png;base64,${base64imgStr}`,{
                folder : "airtist"
            }
        );

        const imgUrl = result.secure_url;

        const newImage = Images({
            prompt,
            imgUrl,
        });

        await newImage.save();

        res.status(200).json({
            success : true,
            imgUrl,
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

export const getAllImages = async (req, res, next) =>{
    try{
        const images = await Images.find();
        res.status(200).json({
            success : true,
            data : {
                images,
            }
        })
    }catch (e) {
        console.log(e.message);
    }
}