import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { CustomJwtPayload } from "../types/CustomJwtPayload.js";
import prisma from "../lib/prisma.js";

export default async function auth (req: Request, res: Response, next: NextFunction) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {

        const payload = jwt.verify(token, process.env.JWT_SECRET!) as CustomJwtPayload;

        const userFromDb = await prisma.user.findUnique({
            where: {
                id: payload.id
            }
        });

        if(!userFromDb) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        req.user = {
            id: userFromDb!.id,
            email: userFromDb!.email
        };

        next();

    } catch {
        
        return res.status(401).json({ message: "Unauthorized" });

    }

}