import express from "express"
import { currentUser, loginUser, logoutUser, registerUser } from "../../controllers/user-controller"
import { authMiddleware } from "../../middleware/auth-middleware"
import { validate } from "../../validator/validate"
import { userValidator } from "../../validator/user-validator"

const userRouter = express.Router()

userRouter.get('/me', authMiddleware, currentUser)
userRouter.post('/register', validate(userValidator), registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', authMiddleware, logoutUser)


export default userRouter
