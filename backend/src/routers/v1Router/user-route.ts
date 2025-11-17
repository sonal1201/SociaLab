import express from "express"
import { loginUser, registerUser } from "../../controllers/user-controller"

const userRouter = express.Router()

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)
