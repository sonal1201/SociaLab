import express from "express"
import onboardingRouter from "./onBoard-route"
import authRouter from "./auth-route"
import userRoute from "./user-routes"
import { authMiddleware } from "../../middleware/auth-middleware"


const v1Router = express.Router()

v1Router.use('/user', authRouter)
v1Router.use('/onBoard', onboardingRouter)
v1Router.use('/user', authMiddleware, userRoute);

export default v1Router
