import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./config.js";

if (
    !process.env.ENV ||
    !process.env.API_PROCESS_PORT ||
    !process.env.API_KEY ||
    !process.env.APP_HEADER
) {
    console.error("Missing required environment variables. Exiting...");
    process.exit(1);
}

// import globalErrorHandler from './controllers/errorController.js';
// import APIError from './helpers/APIError.js';

const app = express();

app.use(cors());
app.use(express.json());

if (process.env.ENV === "dev") app.use(morgan("dev"));

// app.all('*', (req, res, next) => {
//     next(new APIError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// app.use(globalErrorHandler);

export default app;
