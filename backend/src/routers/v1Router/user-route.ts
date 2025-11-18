import express from "express"
import { loginUser, logoutUser, registerUser } from "../../controllers/user-controller"
import { authMiddleware } from "../../middleware/auth-middleware"

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
userRouter.post('/logout', authMiddleware, logoutUser)


export default userRouter
