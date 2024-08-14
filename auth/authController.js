import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Prisma from '../db/Prisma.js';

export const signIn = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await Prisma.user.findFirst({
            where: { email }
        });

        if (!user || user.password !== password) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });

        res.json({
            message: "Sign in successful",
            token
        });
    } catch (error) {
        res.status(500).json({
            message: "Error signing in",
            error: error.message
        });
    }
};
