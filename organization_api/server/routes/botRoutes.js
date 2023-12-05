import { Router } from "express";
import { botGenerateParcels } from "../controllers/botControllers.js";
import catchAsync from "../helpers/catchAsync.js";
import { protectBot } from "./../helpers/protectAppFocusedRoutes.js";
import APIError from "./../helpers/APIError.js";

const router = Router();

const protectGen = catchAsync(async (req, res, next) => {
    const botKey = req.headers["x-bot-key"];
    if (botKey !== process.env.BOT_KEY)
        return next(new APIError("Invalid Bot key.", 400));

    next();
});

router.route("/generate").post(protectBot, protectGen, botGenerateParcels);

export default router;
