import express from "express"
import {imgRouter} from "./routes/imageRouter.js";
import cors from "cors"
import {authRoute} from "./routes/auth.route.js";
import cookieParser from "cookie-parser"

const app = express();

app.use(express.json())
app.use(cookieParser());
app.use(cors({
    credentials : true,
    origin : 'http://localhost:5173',
}))
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/images",imgRouter);
app.get("/test-cookie", (req, res) => {
    console.log("Cookies received:", req.cookies);
    res.json(req.cookies);
});

app.get("/", (req, res)=>{
    res.status(200).json({
        success : true,
        message : "Server is running successfully."
    })
})
export default app;
