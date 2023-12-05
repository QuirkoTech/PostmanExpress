import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./config.js";

if (
    !process.env.ENV ||
    !process.env.API_PROCESS_PORT ||
    !process.env.API_KEY ||
    !process.env.APP_HEADER ||
    !process.env.ORGANIZATION_API_URL
) {
    console.error("Missing required environment variables. Exiting...");
    process.exit(1);
}

import globalErrorHandler from "./controllers/errorControllers.js";
import APIError from "./helpers/APIError.js";
import checkContentType from "./helpers/checkContentType.js";
import cabinetRoutes from "./routes/cabinetRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());
if (process.env.ENV === "dev") app.use(morgan("dev"));
app.use(checkContentType);

app.use("/cabinet", cabinetRoutes);

app.all("*", (req, res, next) => {
    next(new APIError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

export default app;
