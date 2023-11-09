import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./config.js";

import globalErrorHandler from "./controllers/errorController.js";
import APIError from "./helpers/APIError.js";
import consumerRoutes from "./routes/consumerRoutes.js";
import parcelRoutes from "./routes/parcelRoutes.js";
import catchAsync from "./helpers/catchAsync.js";

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.ENV === "dev") app.use(morgan("dev"));

// Check if API keys match
app.use(
    catchAsync(async (req, res, next) => {
        const apiKey = req.headers["x-api-key"];
        if (apiKey !== process.env.API_KEY)
            return next(new APIError("Invalid API key.", 400));

        next();
    }),
);

app.use(`/consumer`, consumerRoutes);
app.use(`/parcel`, parcelRoutes);

app.all("*", (req, res, next) => {
    next(new APIError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
