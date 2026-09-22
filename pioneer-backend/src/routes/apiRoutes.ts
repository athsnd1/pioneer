import express from "express";
import prisma from "../lib/prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../middleware/auth.js";
import crypto from "node:crypto";
import resend from "../lib/resend.js";
import { registerSchema } from "../lib/zod.js";
import { validate } from "../middleware/validation.js";
import rateLimit from "express-rate-limit";
import logger from "../utils/logger.js";
import * as Sentry from "@sentry/node";

const router = express.Router();

const registerLimiter = rateLimit({
    windowMs: 1000 * 60 * 15,
    limit: 15,
    message: "Too many requests. Try again later."
});

router.post("/register", registerLimiter, validate(registerSchema), async (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {

        logger.warn("Failed to create account due to email/password not being provided");

        return res.status(400).json({ message: "Email and password are required" });
    }

    const existingUser = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (existingUser) {

        logger.warn({ userId: existingUser.id }, "User already exists");

        return res.status(409).json({ message: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    try {

        const userCreated = await prisma.user.create({
            data: {
                email: email,
                password: hashedPassword
            }
        });


        if(!userCreated) {
            logger.error("Failed to create account");
        }

        logger.info({ userId: userCreated.id }, "User registered");

        return res.status(201).json({ message: "Account created successfully" });
        
    } catch (error) {
        
        Sentry.captureException(error);

        if (error instanceof Error) {
            console.error(error.message);
        } else {
            console.error("Unknown error occured:", error);
        }

        logger.error({ message: error }, "Failed to create account");

        return res.status(500).json({ message: "Failed to create account" });
    }

});

const loginLimiter = rateLimit({
    windowMs: 1000 * 60 * 15,
    limit: 15,
    message: "Too many requests. Try again later."
})

router.post("/login", loginLimiter, validate(registerSchema), async (req, res) => {
    const { email, password, rememberMe } = req.body;

    const emailExists = await prisma.user.findUnique({
        where: {
            email
        },
    });

    if (!emailExists) {

        logger.warn({ loginEmail: email }, "Account does not exist");

        return res.status(401).json({ message: "Account does not exist" });
    }

    const passwordCorrect = bcrypt.compareSync(password, emailExists.password);

    if (!passwordCorrect) {

        logger.warn({ userId: emailExists.id }, "Failed to log user in due to incorrect password");

        return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
        {
            id: emailExists.id,
            email: emailExists.email
        },

        process.env.JWT_SECRET!,

        {
            expiresIn: rememberMe ? "30d" : "1d"
        }
    );

    if (!token) {

        logger.error({ userId: emailExists.id }, "Failed to generate a token for this user")

        return res.status(500).json({ message: "Failed to generate token" });
    }

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
        httpOnly: true,
        secure: isProduction, // ! change to true in prod to ensure it's done over https
        sameSite: isProduction ? "none" : "lax",
        maxAge: rememberMe ? 30 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000,
    });

    logger.info({ userId: emailExists.id }, "User logged in successfully")

    return res.status(200).json({ message: "User logged in successfully" });

});

router.get("/me", auth, (req, res) => {

    return res.json({ user: req.user });

});

router.post("/logout", (req, res) => {
    
    res.clearCookie("token");

    logger.info( "User logged out successfully");

    return res.json({ message: "Logged out successfully" });
});

router.post("/forgot-password", async (req, res) => {

    const { email } = req.body;

    const userExists = await prisma.user.findUnique({
        where: {
            email
        }
    });

    if (!userExists) {
        return res.status(404).json({ message: "If the provided email exists, an email containing a password reset URL has been sent to it" });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const tokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now

    await prisma.user.update({
        where: {
            id: userExists.id
        },
        data: {
            resetToken: tokenHash,
            resetTokenExpiry: tokenExpiry
        }
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await resend.emails.send({
        from: "Pioneer <onboarding@resend.dev>",
        to: email,
        subject: "Reset your Pioneer Password",
        html: `
            <h2>Reset your password <h2>

            <p> Click the button below to reset your password </p>

            <a href="${resetLink}"> Reset Password </a>

            <p> This link expires in one hour </p>
        `
    });

    return res.status(200).json({ message: "If the provided email exists, a reset link has been sent to it."});

});

router.post("/reset-password", async (req, res) => {

    const { token, password } = req.body;

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    console.log("Token Hash: ", tokenHash);

    const user = await prisma.user.findFirst({
        where: {
            resetToken: tokenHash
        }
    });

    if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
        return res.status(400).json({ message: "Invalid or expired reset link" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const userUpdated = await prisma.user.update({
        where: {
            id: user.id
        },
        data: {
            password: hashedPassword,
            resetToken: null,
            resetTokenExpiry: null
        }
    });

    if (!userUpdated) {
        return res.status(500).json({ message: "Failed to reset password" });
    }

    res.status(200).json({ message: "Password reset successfully" });

});

export default router;