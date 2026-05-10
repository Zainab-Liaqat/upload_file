import User from "../models/userModel.js"
import path from 'path'
import { uploadCloudinary} from '../utils/cloudinary.js'
import {ApiError } from '../utils/apiError.js'
import { User } from '../models/userModel.js';
 export const registerUser = async (req, res) => {
    const {username , email, password, avatar} =req.body;

    if ( [username, email, password, avatar].some((field) =>
    field?.trim() === "")
) {
        throw new ApiError(400, "All field are required ")
    }
}

const existUser = await User.findOne({
    or : [{username}, {email}]
})
if (existUser) {
    throw new ApiError(409, "User with email or username already exists")
}

const avatarLocalPath = req.file?.avatar[0]?.path;
if(!avatarLocalPath)
{
  throw new ApiError(400, "Avatar is required")
}

const avatar = await uploadCloudinary(avatarLocalPath)
if(!avatar){
    throw new ApiError(400, "Avatar upload failed")
}

const user = await User.create({
    username,
    avatar:avatar.url,
    email,
    password
})

const createdUser = await User.findOne(user._id).select("-password")

if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering user")
}

























 
//     try {


//         const localPath = req.file?.path
//         const avatar = await uploadCloudinary(localPath)

//         if (!avatar) {
//             throw new ApiError(400, "Avatar upload failed")
//         }

//         res.status(200).json({
//             message: "File uploaded successfully",
//             imageUrl: avatar.url
//         })

//     } catch (err) {

//         console.error(err.message)

//         res.status(500).json({
//             message: err.message
//         })
//     }
// }