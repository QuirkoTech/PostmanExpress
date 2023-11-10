import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./config.js";

import globalErrorHandler from "./controllers/errorControllers.js";
import APIError from "./helpers/APIError.js";
import authRoutes from "./routes/authRoutes.js";
import checkContentType from "./helpers/checkContentType.js";

const app = express();

app.use(
    cors({
        origin: `${process.env.DRIVER_APP_URL}`,
        credentials: true,
    }),
);
app.use(express.json());

if (process.env.ENV === "dev") app.use(morgan("dev"));

app.use(checkContentType);

app.use("/auth", authRoutes);

app.all("*", (req, res, next) => {
    next(new APIError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
