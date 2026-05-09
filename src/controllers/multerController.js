import path from 'path'
import { uploadCloudinary} from '../utils/cloudinary.js'
 export const registerUser = async (req, res) => {

    try {


        const localPath = req.file?.path
        const avatar = await uploadCloudinary(localPath)

        if (!avatar) {
            return res.status(400).json({
                message: "Avatar upload failed",
            })
        }

        res.status(200).json({
            message: "File uploaded successfully",
            imageUrl: avatar.url
        })

    } catch (err) {

        console.error(err.message)

        res.status(500).json({
            message: err.message
        })
    }
}