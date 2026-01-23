import {Router} from "express";

export const imgRouter = Router();

/*
GET      /health
POST     /api/v1/images/generate
GET      /api/v1/images
DELETE   /api/v1/images/:id
*/

imgRouter.get("/", (req, res)=>{
    res.status(200).json({
        success : true,
        message : "/api/v1/images is fine."
    })
})

imgRouter.get("/generate", (req, res)=>{
    res.status(200).json({
        success : true,
        message : "/api/v1/images/generate is fine."
    })
})

imgRouter.get("/:id", (req,res)=>{
    res.status(200).json({
        success : true,
        message : "/api/v1/images/:id is fine."
    })
})
