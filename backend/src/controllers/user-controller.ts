import { Request, Response } from "express";
import { prisma } from "../config/db";
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    const existingUser = await prisma.user.findMany({
        where: {
            email
        }
    })

    if (existingUser) {
        return res.status(400).json({
            error: 'User already exist'
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            email,
            password: hashPassword
        }
    })

    res.json({
        message: "User Created Successfully",
        user: {
            id: user.id,
            email: user.email
        },
    });
}


export const loginUser = (req: Request, res: Response) => {
}