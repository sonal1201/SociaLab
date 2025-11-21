import { Request, Response } from "express"
import { AuthRequest } from "../middleware/auth-middleware"
import { prisma } from "../config/db";


export const getProfile = async (req: Request, res: Response) => {

    try {
        const userId = req.params.userId

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            include: {
                profile: true,
                posts: true

            }
        })

        if (!user) {
            return res.status(400).json({
                message: "User not Found"
            })
        }

        return res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            error: "getProfile Error"
        })
    }

}

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

export const getAllFollower = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                followers: {
                    include: {
                        follower: {
                            include: {
                                profile: true,
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        return res.status(200).json({
            success: true,
            followers: user.followers.map((f) => f.follower),
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
};


export const getAllFollowing = async (req: AuthRequest, res: Response) => {
    try {
        const { userId } = req.params

        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized"
            })
        }
        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                following: {
                    include: {
                        following: {
                            include: {
                                profile: true
                            }
                        }
                    }
                }
            }
        });

        res.status(201).json({
            success: true,
            following: user?.following.map(f => f.following),
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
}


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