import express from "express"
import {imgRouter} from "./routes/imageRouter.js";

const app = express();

app.use(express.json())
app.use("/api/v1/images", imgRouter);

app.get("/", (req, res)=>{
    res.status(200).json({
        success : true,
        message : "Server is running successfully."
    })
})
export default app;
