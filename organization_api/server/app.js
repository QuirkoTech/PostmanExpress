import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./config.js";

import globalErrorHandler from "./controllers/errorControllers.js";
import APIError from "./helpers/APIError.js";
import consumerRoutes from "./routes/consumerRoutes.js";
import parcelRoutes from "./routes/parcelRoutes.js";
import catchAsync from "./helpers/catchAsync.js";
import { protectConsumer } from "./helpers/protectAppFocusedRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.ENV === "dev") app.use(morgan("dev"));

app.use(
    catchAsync(async (req, res, next) => {
        const apiKey = req.headers["x-api-key"];
        if (apiKey !== process.env.API_KEY)
            return next(new APIError("Invalid API key.", 400));

        const orgType = req.headers["x-organization-type"];
        if (!orgType)
            return next(new APIError("No organization header provided.", 400));

        next();
    }),
);

app.use(`/consumer`, protectConsumer, consumerRoutes);
app.use(`/parcels`, parcelRoutes);

app.all("*", (req, res, next) => {
    next(new APIError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
