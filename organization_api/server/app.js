import express from "express";
import cors from "cors";
import morgan from "morgan";
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
    !process.env.CONSUMER_APP_HEADER ||
    !process.env.DRIVER_APP_HEADER ||
    !process.env.LOCKER_APP_HEADER
) {
    console.error("Missing required environment variables. Exiting...");
    process.exit(1);
}

import globalErrorHandler from "./controllers/errorControllers.js";
import APIError from "./helpers/APIError.js";
import consumerRoutes from "./routes/consumerRoutes.js";
import parcelRoutes from "./routes/parcelRoutes.js";
import cabinetRoutes from "./routes/cabinetRoutes.js";
import catchAsync from "./helpers/catchAsync.js";
import {
    protectConsumer,
    protectLocker,
} from "./helpers/protectAppFocusedRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.ENV === "dev") app.use(morgan("dev"));

app.use(
    catchAsync(async (req, res, next) => {
        const apiKey = req.headers["x-api-key"];
        if (apiKey !== process.env.API_KEY)
            return next(new APIError("Invalid API key.", 400));

        const orgType = req.headers["x-application-type"];
        if (!orgType)
            return next(new APIError("No application header provided.", 400));

        next();
    }),
);

app.use(`/consumer`, protectConsumer, consumerRoutes);
app.use(`/parcels`, parcelRoutes);
app.use("/cabinet", protectLocker, cabinetRoutes);

app.all("*", (req, res, next) => {
    next(new APIError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
