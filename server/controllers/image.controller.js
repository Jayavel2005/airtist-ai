import FormData from "form-data";
import { generateImageService } from "../services/image.service.js";
import {refinePromptService} from "../services/promptRefiner.service.js";
import cloudinary from "../config/cloudinary.js";


export const generateImage = async (req, res) => {
  try {
    const { prompt } = req.body;
    const user = req.user;

    if (!prompt) {
      return res.status(400).json({
        success: false,
        message: "Prompt is required",
      });
    }


    if (user.credits <= 0) {
      return res.status(403).json({
        success: false,
        message: "No credits left",
      });
    }


    user.credits -= 1;

    const form = new FormData();
    form.append("prompt", prompt);

    const imageBuffer = await generateImageService(form);
    const base64imgStr = Buffer.from(imageBuffer).toString("base64");

    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${base64imgStr}`,
      { folder: "airtist" }
    );

    const imageUrl = result.secure_url;

    user.images.push({
      prompt,
      imageUrl,
      model: "sdxl",
      creditsUsed: 1,
      status: "success",
    });

    await user.save();

    res.status(200).json({
      success: true,
      image: imageUrl,
      remainingCredits: user.credits,
      images: user.images,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Image generation failed",
    });
  }
};

export const getMyImages = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      images: req.user.images,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch images",
    });
  }
};


export const deleteImage = async (req, res) => {
  try {
    const { index } = req.params;
    const user = req.user;

    if (!user.images[index]) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    user.images.splice(index, 1);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete image",
    });
  }
};


export const downloadImage = async (req, res) => {
  try {
    const { index } = req.params;
    const image = req.user.images[index];

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found",
      });
    }

    const downloadUrl = image.imageUrl.replace(
      "/upload/",
      "/upload/fl_attachment/"
    );

    return res.redirect(downloadUrl);
  } catch (error) {
    console.error("Download error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to download image",
    });
  }
};


export const refinePrompt = async (req, res, next) =>{
  try{
    const {prompt} = req.body;

    const refinedPrompt = await refinePromptService(prompt);

    console.log(refinedPrompt);

    res.status(200).json({
      success : true,
      refinedPrompt,
    });
  }catch (e){
    console.error("Prompt refining error", e.message);
    res.status(500).json({
      success : false,
      message : "prompt refiner error",
    })
  }
}