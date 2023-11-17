import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "./config.js";

if (
    !process.env.ENV ||
    !process.env.API_PROCESS_PORT ||
    !process.env.DB_USER ||
    !process.env.DB_PWD ||
    !process.env.DB_HOST ||
    !process.env.DB_PORT ||
    !process.env.DB_DATABASE ||
    !process.env.ACCESS_TOKEN_SECRET ||
    !process.env.REFRESH_TOKEN_SECRET ||
    !process.env.ACCESS_TOKEN_TTL ||
    !process.env.REFRESH_TOKEN_TTL ||
    !process.env.API_KEY ||
    !process.env.DRIVER_SIGNUP_KEY ||
    !process.env.ORGANIZATION_API_URL ||
    !process.env.DRIVER_APP_URL ||
    !process.env.DRIVER_APP_DOMAIN ||
    !process.env.APP_HEADER
) {
    console.error("Missing required environment variables. Exiting...");
    process.exit(1);
}

import globalErrorHandler from "./controllers/errorControllers.js";
import APIError from "./helpers/APIError.js";
import authRoutes from "./routes/authRoutes.js";
import parcelRoutes from "./routes/parcelRoutes.js";
import checkContentType from "./helpers/checkContentType.js";

const app = express();

app.use(
    cors({
        origin: `${process.env.DRIVER_APP_URL}`,
        credentials: true,
    }),
);
app.use(cookieParser());
app.use(express.json());

if (process.env.ENV === "dev") app.use(morgan("dev"));

app.use(checkContentType);

app.use("/auth", authRoutes);
app.use("/parcels", parcelRoutes);

app.all("*", (req, res, next) => {
    next(
        new APIError(
            `Can't find ${req.originalUrl} on this server!process.env.`,
            404,
        ),
    );
});

app.use(globalErrorHandler);

export default app;
