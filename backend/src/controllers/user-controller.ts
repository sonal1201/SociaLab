import { Response } from "express"
import { AuthRequest } from "../middleware/auth-middleware"
import { prisma } from "../config/db";

export const followUser = async (req: AuthRequest, res: Response) => {
    try {
        const { followId } = req.params;
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (userId === followId) {
            return res.status(400).json({ error: "You cannot follow yourself" });
        }

        //already following check
        const alreadyFollowing = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: followId
                }
            }
        })

        if (alreadyFollowing) {
            return res.status(400).json({ error: "Already following this user" });
        }

        await prisma.follow.create({
            data: {
                followerId: userId,
                followingId: followId
            }
        })

        return res.status(200).json({ success: true, message: "Followed successfully" });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
}
export const unfollowUser = async (req: AuthRequest, res: Response) => {
    try {
        const { followId } = req.params;
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (userId === followId) {
            return res.status(400).json({ error: "You cannot unfollow yourself" });
        }

        const existing = await prisma.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: followId,
                },
            },
        });

        if (!existing) {
            return res.status(400).json({
                error: "You are not following this user",
            });
        }

        await prisma.follow.delete({
            where: {
                followerId_followingId: {
                    followerId: userId,
                    followingId: followId,
                },
            },
        });

        return res.status(200).json({
            success: true,
            message: "Unfollowed successfully",
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
};

export const createPost = async (req: AuthRequest, res: Response) => {

}

export const deletePost = async (req: AuthRequest, res: Response) => {

}

export const likePost = async (req: AuthRequest, res: Response) => {

}

export const unlikePost = async (req: AuthRequest, res: Response) => {

}

export const createComment = async (req: AuthRequest, res: Response) => {

}

export const deleteComment = async (req: AuthRequest, res: Response) => {

}

export const createStory = async (req: AuthRequest, res: Response) => {

}

export const deleteStory = async (req: AuthRequest, res: Response) => {

}

export const getFeed = async (req: AuthRequest, res: Response) => {

}