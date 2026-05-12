import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { ApiError } from "./apiError.js";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadCloudinary = async (localfilePath) => {

    if (!localfilePath) {
        throw new ApiError(400, "Local file path is missing");
    }

    const response = await cloudinary.uploader.upload(localfilePath, {
        resource_type: "auto"
    });

    // delete local file after upload
    fs.unlinkSync(localfilePath);

    if (!response) {
        throw new ApiError(500, "Cloudinary upload failed");
    }

    return response.secure_url;
};

export { uploadCloudinary };
