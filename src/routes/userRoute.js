import express from 'express'
import { upload } from '../middleware/multerMiddleware.js'
 import { registerUser , loginUser, logoutUser} from '../controllers/userController.js'
 import { verifyJWT} from '../middleware/authMiddleware.js'


const router = express.Router()

router.post(
    '/register',
    upload.single('avatar'),
    registerUser
)
router.post('/login', loginUser)
router.post('/logout' , verifyJWT, logoutUser)
export default router