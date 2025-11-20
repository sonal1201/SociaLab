import express from "express";
import { createComment, createPost, createStory, deleteComment, deletePost, deleteStory, followUser, getFeed, likePost, unfollowUser, unlikePost } from "../../controllers/user-controller";

const userRoute = express.Router();


userRoute.post("/follow/:id", followUser);
userRoute.post("/unfollow/:id", unfollowUser);

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