import mongoose from "mongoose";

const userModel = mongoose.Schema({
    username : {
        type : String,
        required : true,
        trim : true,
        minLength : 3,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        match : [/^[^\s@]+@[^\s@]+\.[^\s@]+$/],
    },
    password : {
        type : String,
        required : true,
        select : false,
    }
})

export const User = mongoose.model("User", userModel);
