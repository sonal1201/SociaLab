import express from "express"
import { authMiddleware } from "../../middleware/auth-middleware"
import {  onBoardingUser, updateProfile } from "../../controllers/onBoard-controller";
import { upload } from "../../middleware/multer";

const onboardingRouter = express.Router()

onboardingRouter.use(authMiddleware);

onboardingRouter.post('/', upload.single("profileImage"), onBoardingUser)
onboardingRouter.put('/edit-profile', upload.single("profileImage"), updateProfile)

export default onboardingRouter