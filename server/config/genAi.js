import { GoogleGenAI } from "@google/genai"
import {config} from "./env.js";

export const genAI = new GoogleGenAI({
    apiKey : config.GEMINI_API_KEY,
})
