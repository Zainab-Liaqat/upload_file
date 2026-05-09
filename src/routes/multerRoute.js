import express from 'express'
import { upload } from '../middleware/multerMiddleware.js'
 import { registerUser } from '../controllers/multerController.js'


const router = express.Router()

router.post(
    '/register',
    upload.single('avatar'),
    registerUser
)


export default router