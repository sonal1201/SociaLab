import express from "express";
import { createComment, createPost, createStory, deleteComment, deletePost, deleteStory, followUser, getAllFollower, getAllFollowing, getFeed, getProfile, likePost, unfollowUser, unlikePost } from "../../controllers/user-controller";
import { authMiddleware } from "../../middleware/auth-middleware";
import { upload } from "../../middleware/multer";

const userRoute = express.Router();

userRoute.use(authMiddleware)

userRoute.get("/:userId", getProfile)


userRoute.post("/follow/:followId", followUser);
userRoute.post("/unfollow/:followId", unfollowUser);
userRoute.get('/get-follower/:userId', getAllFollower)
userRoute.get('/get-following/:userId', getAllFollowing)

//posts api
userRoute.post("/posts", upload.single("postImage"), createPost);
userRoute.delete("/posts/:postId", deletePost);

userRoute.post("/posts/:postId/like", likePost);
userRoute.delete("/posts/:postId/unlike", unlikePost);

userRoute.post("/posts/:postId/create-comments", createComment);
userRoute.delete("/comments/:commentId", deleteComment);

userRoute.post("/stories", createStory);
userRoute.delete("/stories/:id", deleteStory);

userRoute.get("/feed", getFeed);


export default userRoute;