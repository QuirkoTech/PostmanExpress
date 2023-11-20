import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import "./config.js";

if (
    !process.env.ENV ||
    !process.env.API_PROCESS_PORT ||
    !process.env.API_KEY ||
    !process.env.ORGANIZATION_API_URL ||
    !process.env.CONSUMER_APP_URL ||
    !process.env.CONSUMER_APP_DOMAIN ||
    !process.env.APP_HEADER
) {
    console.error("Missing required environment variables. Exiting...");
    process.exit(1);
}

import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import parcelRoutes from "./routes/parcelRoutes.js";
import globalErrorHandler from "./controllers/errorControllers.js";
import APIError from "./helpers/APIError.js";
import checkContentType from "./helpers/checkContentType.js";

const app = express();

app.use(
    cors({
        origin: `${process.env.CONSUMER_APP_URL}`,
        credentials: true,
    }),
);
app.use(cookieParser());
app.use(express.json());

if (process.env.ENV === "dev") app.use(morgan("dev"));

app.use(checkContentType);

// Here are all the application routes
app.use("/auth", authRoutes);
app.use("/me", userRoutes);
app.use("/parcels", parcelRoutes);

app.all("*", (req, res, next) => {
    next(new APIError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
