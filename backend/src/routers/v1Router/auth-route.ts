import express from "express"
import { currentUser, loginUser, logoutUser, registerUser } from "../../controllers/auth-controller"
import { authMiddleware } from "../../middleware/auth-middleware"
import { validate } from "../../validator/validate"
import { userValidator } from "../../validator/user-validator"

const authRouter = express.Router()

authRouter.get('/me', authMiddleware, currentUser)
authRouter.post('/register', validate(userValidator), registerUser)
authRouter.post('/login', loginUser)
authRouter.post('/logout', authMiddleware, logoutUser)


export default authRouter
