import {encryptPassword, passwordMatch} from "../utils/encrypt.util.js";
import {User} from "../models/user.model.js";
import {generateToken} from "../utils/generateToken.util.js";

export const signup = async (req, res, next) =>{
    try{
        const {username, email, password} = req.body;
        // retrieve the user logic
        const user = await User.findOne({email});
        if (user){
            return res.status(409).json({
                success : false,
                message : "User Already Exists..",
            })
        }

        const hashedPsw = await encryptPassword(password);

        const newUser = new User({
            username,
            email,
            password : hashedPsw,
        })

        await newUser.save();

        res.status(201).json({
            success : true,
            user : newUser,
        })

    }catch (e) {
        next(e);
    }
}

export const login =async (req, res, next) =>{
    const {email, password} = req.body;

    const user = await User.findOne({email}).select("+password");
    // Check user is present
    if (!user){
        return res.status(404).json({
            success : false,
            message : "User not found please register",
        })
    }
    // console.log(user);

    // check for authorized user
    const isMatch = await passwordMatch(password,user.password);

    if (!isMatch){
        return res.status(409).json({
            success : false,
            message : "Invalid credentials",
        })
    }

    const userObj = user.toObject();
    delete userObj.password;

    const token = generateToken(user);

    res.status(200).json({
        success : true,
        user : {
            userObj,
            token
        }
    })


}