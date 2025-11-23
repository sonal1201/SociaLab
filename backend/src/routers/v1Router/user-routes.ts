import express from "express";
import {
    createComment,
    createPost,
    createStory,
    deleteComment,
    deletePost,
    deleteStory,
    followUser,
    getAllFollower,
    getAllFollowing,
    getAlluser,
    getFeed,
    getProfile,
    getStoryFeed,
    likePost,
    unfollowUser,
    unlikePost,
} from "../../controllers/user-controller";

import { authMiddleware } from "../../middleware/auth-middleware";
import { upload } from "../../middleware/multer";

const userRoute = express.Router();

userRoute.use(authMiddleware);

userRoute.get("/feed", getFeed);
userRoute.get("/all-users", getAlluser);
userRoute.get('/get-follower/:userId', getAllFollower);
userRoute.get('/get-following/:userId', getAllFollowing);

// follow system
userRoute.post("/follow/:followId", followUser);
userRoute.post("/unfollow/:followId", unfollowUser);

// posts
userRoute.post("/posts", upload.single("postImage"), createPost);
userRoute.delete("/posts/:postId", deletePost);

userRoute.post("/posts/:postId/like", likePost);
userRoute.delete("/posts/:postId/unlike", unlikePost);

userRoute.post("/posts/:postId/create-comments", createComment);
userRoute.delete("/comments/:commentId", deleteComment);

// stories
userRoute.get('/get-stories/feed', getStoryFeed);
userRoute.post("/stories", upload.single("storyImage"), createStory);
userRoute.delete("/stories/:storyId", deleteStory);

// profile route
userRoute.get("/:userId", getProfile);

export default userRoute;
