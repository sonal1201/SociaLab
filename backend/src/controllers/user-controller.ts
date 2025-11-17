import { Request, Response } from "express";
import { prisma } from "../config/db";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export const registerUser = async (req: Request, res: Response) => {
    try {
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
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }

}


export const loginUser = async (req: Request, res: Response) => {

    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: 'Email and password are required' });
        }

        const user = await prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const passwordCompare = await bcrypt.compare(password, user.password);

        if (!passwordCompare) {
            res.status(401).json({
                error: "Incorrect Password"
            })
        }

        const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
            expiresIn: '1d'
        })

        res.status(200).json({
            message: "User loggedIn successfully",
            token
        })

    } catch (error) {
        console.error('LoginIn error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}