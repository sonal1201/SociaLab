import { Request, Response } from "express"
import { AuthRequest } from "../middleware/auth-middleware"
import { prisma } from "../config/db";
import { count, error } from "console";
import uploadOnCloudinary from "../config/cloudinary";
import { success } from "zod";


export const getProfile = async (req: Request, res: Response) => {

    try {
        const userId = req.params.userId

        const user = await prisma.user.findFirst({
            where: {
                id: userId
            },
            include: {
                profile: true,
                posts: {
                    include: {
                        likes: true,
                        comments: true
                    }
                },
                stories: true

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
    try {
        const { caption, image } = req.body;

        console.log("req.userId from middleware:", req.userId);
        console.log("Creating post with caption:", caption);


        const userId = req.userId

        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized User"
            })
        }

        if (!caption && !image) {
            return res.status(400).json({
                error: "Post must include a caption or an image",
            });
        }

        let imageUrl = null;
        if (req.file) {
            imageUrl = await uploadOnCloudinary(req.file.path);
        }

        const created = await prisma.post.create({
            data: {
                caption,
                image: imageUrl,
                userId
            },
            include: {
                user: {
                    include: {
                        profile: true
                    }
                },
                likes: {
                    include: {
                        user: {
                            include: {
                                profile: true
                            }
                        }
                    }
                },
                comments: {
                    include: {
                        user: {
                            include: {
                                profile: true
                            }
                        }
                    }
                }
            }
        });

        return res.status(201).json({
            success: true,
            post: created
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "createPost Error" });
    }
}

export const deletePost = async (req: AuthRequest, res: Response) => {
    try {
        const { postId } = req.params

        const userId = req.userId

        if (!userId) {
            return res.status(401).json({
                error: "Unauthorized User"
            })
        }

        const post = await prisma.post.findUnique({
            where: { id: postId }
        })

        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        if (post.userId !== userId) {
            return res.status(403).json({ error: "You are not allowed to delete this post" })
        }

        const deletePost = await prisma.post.delete({
            where: {
                id: postId
            }
        })

        res.status(200).json({
            success: true,
            message: "Post deleted successfully"
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "deletePost Error" });
    }
}

export const likePost = async (req: AuthRequest, res: Response) => {
    try {
        const { postId } = req.params;
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                error: "Unauthorized User"
            })
        }

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const alreadyLiked = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        })

        if (alreadyLiked) {
            return res.status(400).json({
                error: "you Already liked this Post"
            })
        }

        await prisma.like.create({
            data: {
                userId,
                postId
            }
        });

        const likeCount = await prisma.like.count({
            where: { postId }
        });

        return res.status(201).json({
            success: true,
            message: "Post liked",
            likes: likeCount
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "likePost Error" });
    }
}

export const unlikePost = async (req: AuthRequest, res: Response) => {
    try {

        const { postId } = req.params;
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                error: "Unauthorized User"
            })
        }

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const existingLike = await prisma.like.findUnique({
            where: {
                userId_postId: {
                    userId,
                    postId
                }
            }
        });

        if (!existingLike) {
            return res.status(400).json({
                error: "You have not liked this post"
            });
        }

        await prisma.like.delete({
            where: {
                userId_postId: {
                    userId,
                    postId
                }

            }
        })

        const likeCount = await prisma.like.count({
            where: { postId }
        });

        return res.status(200).json({
            success: true,
            message: "Unliked Post",
            likes: likeCount
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "unLiked Error" });
    }
}

export const createComment = async (req: AuthRequest, res: Response) => {
    try {
        const { text } = req.body;
        const { postId } = req.params;
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                error: "Unauthorized User"
            })
        }

        if (!text || text.trim() === "") {
            return res.status(400).json({ error: "Comment cannot be empty" });
        }

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const comment = await prisma.comment.create({
            data: {
                text,
                userId,
                postId
            },
            include: {
                user: {
                    include: { profile: true }
                }
            }
        });

        const commentCount = await prisma.comment.count({
            where: { postId }
        });

        return res.status(201).json({
            success: true,
            message: "Comment added",
            comment,
            commentCount
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "createComment Error" });
    }
}

export const deleteComment = async (req: AuthRequest, res: Response) => {
    try {
        const { commentId } = req.params
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                error: "Unauthorized User"
            })
        }

        const comment = await prisma.comment.findUnique({
            where: { id: commentId }
        });

        if (!comment) {
            return res.status(404).json({ error: "Comment not found" });
        }

        if (comment.userId !== userId) {
            return res.status(403).json({
                error: "You are not allowed to delete this comment"
            });
        }

        const postId = comment.postId;

        await prisma.comment.delete({
            where: { id: commentId }
        });
        const commentCount = await prisma.comment.count({
            where: { postId }
        });

        return res.status(200).json({
            success: true,
            message: "Comment deleted successfully",
            commentCount
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "deleteComment Error" });
    }
}

export const getStory = async (req: AuthRequest, res: Response) => {

}

export const createStory = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                error: "Unauthorized User"
            })
        }

        const { caption } = req.body;

        if (!req.file) {
            return res.status(400).json({ error: "Image is required for a story" });
        }

        const imageUrl = await uploadOnCloudinary(req.file.path);

        if (!imageUrl) {
            return res.status(500).json({ error: "Failed to upload image" });
        }

        const expiresAt = new Date(Date.now() + 12 * 60 * 60 * 1000);

        const story = await prisma.story.create({
            data: {
                userId,
                caption,
                image: imageUrl,
                expiresAt
            },
            include: {
                user: {
                    include: { profile: true }
                }
            }
        });

        return res.status(201).json({
            success: true,
            message: "Story created successfully",
            story
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "createStory Error" });
    }
}

export const deleteStory = async (req: AuthRequest, res: Response) => {
    try {
        const { storyId } = req.params
        const userId = req.userId;

        if (!userId) {
            return res.status(400).json({
                error: "Unauthorized User"
            })
        }

        const storyExist = await prisma.story.findUnique({
            where: {
                id: storyId
            }
        })

        if (!storyExist) {
            return res.status(404).json({
                error: "Story Not Found"
            })
        }

        if (storyExist.userId !== userId) {
            return res.status(403).json({
                error: "You cannot delete this story."
            })
        }

        await prisma.story.delete({
            where: {
                id: storyId
            }
        })

        return res.status(200).json({
            success: true,
            message: "Story deleted successfully"
        });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "deleteStory Error" });
    }
}

type StoryGroup = {
    user: any;
    stories: {
        id: string;
        caption: string | null;
        image: string | null;
        createdAt: Date;
        expiresAt: Date;
    }[];
};
export const getStoryFeed = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.userId;

        console.log("FEED HIT → userId:", userId);

        if (!userId) {
            return res.status(400).json({ error: "Unauthorized User" });
        }

        const following = await prisma.follow.findMany({
            where: { followerId: userId },
            select: { followingId: true }
        });

        const followingIds = following.map(f => f.followingId);
        followingIds.push(userId);

        if (followingIds.length === 0) {
            return res.status(200).json({ success: true, stories: [] });
        }

        const feedStories = await prisma.story.findMany({
            where: {
                userId: { in: followingIds },
                expiresAt: { gt: new Date() }
            },
            include: {
                user: {
                    include: { profile: true }
                }
            },
            orderBy: { createdAt: "desc" }
        });

        const grouped = Object.values(
            feedStories.reduce((acc: any, story) => {
                const uid = story.userId;

                if (!acc[uid]) {
                    acc[uid] = {
                        user: story.user,
                        stories: []
                    };
                }

                acc[uid].stories.push({
                    id: story.id,
                    caption: story.caption,
                    image: story.image,
                    createdAt: story.createdAt,
                    expiresAt: story.expiresAt
                });

                return acc;
            }, {})
        );

        return res.status(200).json({
            success: true,
            stories: grouped   // spelling fixed
        });

    } catch (error) {
        console.log("FEED ERROR:", error);
        return res.status(500).json({ error: "getStories Error" });
    }
};
