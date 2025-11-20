import express from "express";
import { createComment, createPost, createStory, deleteComment, deletePost, deleteStory, followUser, getFeed, likePost, unfollowUser, unlikePost } from "../../controllers/user-controller";
import { authMiddleware } from "../../middleware/auth-middleware";

const userRoute = express.Router();

userRoute.use(authMiddleware)

userRoute.post("/follow/:followId", followUser);
userRoute.post("/unfollow/:followId", unfollowUser);

userRoute.post("/posts", createPost);
userRoute.delete("/posts/:id", deletePost);

userRoute.post("/posts/:id/like", likePost);
userRoute.delete("/posts/:id/unlike", unlikePost);

userRoute.post("/posts/:id/comments", createComment);
userRoute.delete("/comments/:id", deleteComment);

userRoute.post("/stories", createStory);
userRoute.delete("/stories/:id", deleteStory);

userRoute.get("/feed", getFeed);


export default userRoute;