import express from "express"
import userRouter from "./user-route"
import onboardingRouter from "./onBoard-route"


const v1Router = express.Router()

v1Router.use('/user', userRouter)
v1Router.use('/onBoard', onboardingRouter)

export default v1Router
