import axios from "axios";
import {config} from "../config/env.js";


export const generateImageService = async (prompt) =>{
    const response = await axios.post(
        "https://clipdrop-api.co/text-to-image/v1",
        prompt,
        {
            headers:{
                "x-api-key" : config.CLIPDROP_API_KEY,
            },
            responseType : "arraybuffer",
        }
    );

    return response.data;
}