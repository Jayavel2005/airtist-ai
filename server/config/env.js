import dotenv from "dotenv"

dotenv.config();

export const config = {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_DB_URI,

    CLIPDROP_API_KEY : process.env.CLIPDROP_API_KEY,

    CLOUDINARY_CLOUD_NAME : process.env.CLOUDINARY_CLOUD_NAME,
    CLOUDINARY_API_KEY : process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_API_SECRET : process.env.CLOUDINARY_API_SECRET,

    JWT_SECRET : process.env.JWT_SECRET,
    JWT_EXPIRES_IN : process.env.JWT_EXPIRES_IN,

    GEMINI_API_KEY : process.env.GEMINI_API_KEY,
}