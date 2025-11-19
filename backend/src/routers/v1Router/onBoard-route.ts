import express from "express"
import { authMiddleware } from "../../middleware/auth-middleware"
import { onBoardingUser, updateProfile } from "../../controllers/onBoard-controller";

const onboardingRouter = express.Router()

onboardingRouter.use(authMiddleware);

onboardingRouter.post('/', onBoardingUser)
onboardingRouter.put('/edit-profile',updateProfile)

export default onboardingRouter