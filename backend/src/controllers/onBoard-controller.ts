import { Request, Response } from "express";
import { prisma } from "../config/db";
import { AuthRequest } from "../middleware/auth-middleware";
import uploadOnCloudinary from "../config/cloudinary";



export const onBoardingUser = async (req: AuthRequest, res: Response) => {
    try {
        const { username, fullname, bio, profileImageUrl } = req.body;
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        if (!username || !fullname) {
            return res.status(400).json({ error: 'username and name are required' });
        }

        const existingUser = await prisma.onBoardUser.findUnique({
            where: {
                username
            }
        })

        if (existingUser) {
            return res.status(400).json({ error: 'username already exists' });
        }

        let profileImage;

        if (req.file) {
            profileImage = await uploadOnCloudinary(req.file.path)
        }



        const profile = await prisma.onBoardUser.create({
            data: {
                fullname,
                username,
                bio,
                profileImageUrl: profileImage,
                user: {
                    connect: { id: userId }
                }
            },
            include: {
                user: true
            }
        })
        return res.status(201).json({
            success: true,
            message: "Onboarding complete",
            profile
        });


    } catch (error) {
        console.error('OnBoardingError :', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const updateProfile = async (req: AuthRequest, res: Response) => {
    try {
        const { username, fullname, bio, profileImageUrl } = req.body;
        const userId = req.userId

        if (!userId) {
            return res.status(401).json({ error: "Unauthorized" });
        }

        const user = await prisma.user.findUnique({
            where: { id: userId },
            include: { profile: true }
        })

        if (!user || !user.profileId) {
            return res.status(404).json({
                error: "Profile Not found"
            })
        }

        if (username) {
            const usernameExists = await prisma.onBoardUser.findUnique({
                where: { username }
            });

            // username ALREADY exist
            if (usernameExists && usernameExists.id !== user.profileId) {
                return res.status(400).json({ error: "Username already taken" });
            }
        }

        let profileImage;

        if (req.file) {
            profileImage = await uploadOnCloudinary(req.file.path)
        }

        const updatedProfile = await prisma.onBoardUser.update({
            where: { id: user.profileId },
            data: {
                fullname,
                username,
                bio,
                profileImageUrl: profileImage
            }
        });

        const updatedUser = await prisma.user.findUnique({
            where: { id: userId },
            include: {
                profile: true,
                posts: true,
                followers: true,
                following: true
            }
        });

        return res.status(200).json({
            message: "Profile updated successfully",
            updatedUser
        });

    } catch (error) {
        console.error("UpdateProfileError:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

