import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const isAuthenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({ message: "Authorization denied" });
        return;
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
        throw new Error("JWT_SECRET is not defined in environment variables");
        }
        const decoded = jwt.verify(token, secret) as {_id: string};
        req.user = { _id: decoded._id };
        const user = req.user as { _id: string };
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};

export default isAuthenticate;