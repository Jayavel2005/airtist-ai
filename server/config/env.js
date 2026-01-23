import dotenv from "dotenv"

dotenv.config();

export const config = {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_DB_URI,
    CLIPDROP_API_KEY : process.env.CLIPDROP_API_KEY,
}