import fs from "fs"
import { uploadCloudinary } from '../utils/cloudinary.js'
import { ApiError } from '../utils/apiError.js'
import { User } from '../models/userModel.js'

const generateAccessAndRefreshTokens = async(userId) =>{
    try{
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()
        user.refreshToken = refreshToken
        await user.save( {validateBeforeSave: false })

        return { accessToken, refreshToken }

    }catch(error){
        throw new ApiError(500, message.err, "Something went wrong while generating access token or refresh token")
    }
}
export const registerUser = async (req, res) => {

    const { username, email, password } = req.body

    // validation
    if ([username, email, password].some(
        (field) => field?.trim() === ""
    )) {
        throw new ApiError(400, "All fields are required")
    }

    // check existing user
    const existUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existUser) {
        throw new ApiError(
            409,
            "User with email or username already exists"
        )
    }

    // avatar file path
    const avatarLocalPath = req.file?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required")
    }

    // upload on cloudinary
    const avatar = await uploadCloudinary(avatarLocalPath)

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed")
    }

    // create user
    const newUser = await User.create({
        username,
        email,
        password,
        avatar: avatar
    })

    // remove password
    const createdUser = await User.findById(newUser._id)
        .select("-password")

    if (!createdUser) {
        throw new ApiError(
            500,
            "Something went wrong while registering user"
        )
    }

    // response
    return res.status(201).json({
        success: true,
        data: createdUser,
        message: "User registered successfully"
    })
}

export const loginUser = async (req, res)  =>{
    const {email, username} = req.body

    if(!username || !email ){
        throw new ApiError(400, "Email or username is required")
    }
    const user = await User.findOne({
        $or : [{email}, {username}]
    })
    if(!user){
        throw new ApiError(404, "user does not exist")
    }


    const { accessToken , refreshToken} = await generateAccessAndRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id)
    .select("-password -refreshToken")

    const options = {
        httpOnly : true,
        secure : true
    }
    res.status(200).cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json({
        success: true,
        user: loggedInUser,
        accessToken: accessToken,
        refreshToken: refreshToken
    }, "User logged in successfully")

}

export const logoutUser = async(req,res) => {

   await User.findByIdAndUpdate(
      req.user._id,
      {
         $unset: {
            refreshToken: 1
         }
      },
      {
         new: true
      }
   )

   const options = {
      httpOnly: true,
      secure: true
   }

   return res
   .status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json({
      message: "User logged out successfully"
   })
}







