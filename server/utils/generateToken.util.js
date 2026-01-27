import jwt from "jsonwebtoken"
import {config} from "../config/env.js";

export const generateToken = (payload) =>{
    return jwt.sign(
        {
            id:  payload._id,
            username: payload.username,
            email : payload.email,
        },
        config.JWT_SECRET,
        {
            expiresIn: config.JWT_EXPIRES_IN
        }
    )
}
