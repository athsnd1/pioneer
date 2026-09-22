import "./instrument.js";
import * as Sentry from "@sentry/node";

import express from "express";
import cors from "cors";
import apiRoutes from "./routes/apiRoutes.js";
import cookieParser from "cookie-parser";
import reportRoutes from "./routes/reportRoutes.js";
import auth from "./middleware/auth.js";
import studentRoutes from "./routes/studentRoutes.js";
import rateLimit from "express-rate-limit";
import logger from "./utils/logger.js";
import { pinoHttp } from "pino-http";

const app = express();

app.set("trust proxy", 1);

const generalLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    message: "Too many requests from this IP. Try again later."
})

app.use(cors({
    origin: ["http://localhost:5173", process.env.FRONTEND_URL!],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(generalLimiter);
app.use(pinoHttp({
    logger
}));
app.use("/auth", apiRoutes);
app.use("/report", auth, reportRoutes);
app.use("/students", auth, studentRoutes);

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Pioneer backend is running",
    });
});

app.get("/debug-sentry", () => {
    throw new Error("Sentry test error")
});

Sentry.setupExpressErrorHandler(app);

export default app;