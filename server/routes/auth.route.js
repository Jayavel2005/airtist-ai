import {Router} from "express";
import {login, signup} from "../controllers/auth.controller.js";

export const  authRoute = Router();

authRoute.post("/login",login);
authRoute.post("/signup", signup);
// authRoute.post("/logout");