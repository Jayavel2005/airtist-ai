import mongoose from "mongoose";


const ImageModel = new mongoose.Schema({
    prompt : {
        type : String,
        required : true,
    },
    imgUrl : {
        type : Buffer,
        required : true,
    },
},{
    timestamps : true,
})

export const Images = mongoose.model("Images", ImageModel );